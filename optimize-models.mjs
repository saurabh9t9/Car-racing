import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import {
  dedup,
  flatten,
  inspect,
  join,
  listTextureSlots,
  meshopt,
  metalRough,
  palette,
  prune,
  quantize,
  reorder,
  simplify,
  weld,
} from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';

const root = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.join(root, 'public', 'models');
const outputRoot = path.join(root, 'public', 'models-optimized');
const cachePath = path.join(root, 'node_modules', '.cache', 'model-optimizer.json');
const reportPath = path.join(root, 'performance-model-report.md');
const OPTIMIZER_VERSION = 'perf60-cars-and-env-v6';

let io;

async function findGlbs(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    let itemStat;
    try {
      itemStat = await fs.stat(fullPath);
    } catch {
      continue;
    }
    if (itemStat.isDirectory()) files.push(...(await findGlbs(fullPath)));
    else if (itemStat.isFile() && entry.name.toLowerCase().endsWith('.glb')) files.push(fullPath);
  }
  return files;
}

async function fingerprint(file) {
  const stat = await fs.stat(file);
  return `${stat.size}:${stat.mtimeMs}`;
}

async function readCache() {
  try {
    return JSON.parse(await fs.readFile(cachePath, 'utf8'));
  } catch {
    return {};
  }
}

async function writeCache(cache) {
  await fs.mkdir(path.dirname(cachePath), { recursive: true });
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));
}

function inspection(document) {
  return JSON.stringify(inspect(document), null, 2);
}

function safeCodeBlock(value) {
  return value.replaceAll('```', "''' ");
}

function countSceneTriangles(document) {
  let tris = 0;
  for (const mesh of document.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      const idx = prim.getIndices();
      const pos = prim.getAttribute('POSITION');
      tris += idx ? idx.getCount() / 3 : pos ? pos.getCount() / 3 : 0;
    }
  }
  return Math.round(tris);
}

function stripUnusedEnvMapsAndTangents(document) {
  // envAssets.ts replaces all env materials with MeshStandardMaterial using only map (+ emissiveMap on night_city).
  // Stripping unused PBR maps, material extensions & tangents saves network/VRAM and enables clean vertex welding & simplification.
  for (const mat of document.getRoot().listMaterials()) {
    mat.setNormalTexture(null);
    mat.setMetallicRoughnessTexture(null);
    mat.setOcclusionTexture(null);
    for (const ext of mat.listExtensions()) {
      ext.dispose();
    }
  }
  for (const mesh of document.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      const tangent = prim.getAttribute('TANGENT');
      if (tangent) {
        prim.setAttribute('TANGENT', null);
      }
    }
  }
}

function thinDenseFoliageSoup(document, maxTrisPerFoliagePrim = 5200) {
  // Some foliage assets (e.g. cherry_blossom_trees) consist of 100k+ disconnected 1-triangle leaf cards.
  // MeshoptSimplifier cannot collapse disconnected triangles, so we deterministically thin excess leaf cards.
  for (const mesh of document.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      const matName = (prim.getMaterial()?.getName() ?? '').toLowerCase();
      const idx = prim.getIndices();
      const pos = prim.getAttribute('POSITION');
      if (!idx || !pos) continue;

      const triCount = Math.floor(idx.getCount() / 3);
      const isDisconnectedSoup = pos.getCount() >= idx.getCount() * 0.88;
      if (!isDisconnectedSoup || triCount <= maxTrisPerFoliagePrim) continue;
      if (!/(leaf|foliage|blossom|petal|crown|branch)/i.test(matName) && triCount < 30000) continue;

      const keepStep = Math.ceil(triCount / maxTrisPerFoliagePrim);
      const oldArray = idx.getArray();
      const kept = [];
      for (let t = 0; t < triCount; t++) {
        if (t % keepStep === 0) {
          const b = t * 3;
          kept.push(oldArray[b], oldArray[b + 1], oldArray[b + 2]);
        }
      }
      const nextArr = oldArray instanceof Uint32Array ? new Uint32Array(kept) : new Uint16Array(kept);
      idx.setArray(nextArr);
    }
  }
}

async function compressTexturesLossAware(document, isEnv, isHeavySakuraComplex) {
  // Compress every texture using WebP with quality tuned per texture role,
  // and never replace an existing WebP with a larger output unless resizing is required.
  for (const tex of document.getRoot().listTextures()) {
    const img = tex.getImage();
    if (!img || img.byteLength < 512) continue;

    const slots = listTextureSlots(tex);
    const isNormal = slots.some((s) => /normal/i.test(s));
    const isData = slots.some((s) => /(metallicRoughness|occlusion)/i.test(s));
    const maxDim = isNormal || isData || isHeavySakuraComplex ? 256 : 512;
    const mime = tex.getMimeType();

    try {
      const meta = await sharp(img).metadata();
      const needsResize = (meta.width || 0) > maxDim || (meta.height || 0) > maxDim;
      let pipeline = sharp(img);
      if (needsResize) {
        pipeline = pipeline.resize(maxDim, maxDim, { fit: 'inside', withoutEnlargement: true });
      }

      const quality = isNormal ? 86 : isData ? 82 : isEnv ? 72 : 76;
      const webpBuffer = await pipeline
        .webp({
          quality,
          effort: 6,
          alphaQuality: isEnv ? 82 : 88,
          smartSubsample: true,
        })
        .toBuffer();

      if (needsResize || webpBuffer.byteLength < img.byteLength) {
        tex.setImage(new Uint8Array(webpBuffer));
        tex.setMimeType('image/webp');
      }
    } catch {
      // Leave texture untouched if Sharp cannot decode an exotic format
    }
  }
}

async function processModel(source, cache) {
  const relative = path.relative(sourceRoot, source).split(path.sep).join('/');
  const output = path.join(outputRoot, ...relative.split('/'));
  const currentFingerprint = `${await fingerprint(source)}:${OPTIMIZER_VERSION}`;
  const previous = cache[relative];

  if (
    previous?.fingerprint === currentFingerprint &&
    !previous.error &&
    (await fs.access(output).then(() => true, () => false))
  ) {
    return previous;
  }

  await fs.mkdir(path.dirname(output), { recursive: true });
  const tempOutput = `${output}.tmp.glb`;
  const beforeBytes = (await fs.stat(source)).size;
  const document = await io.read(source);
  const beforeInspection = inspection(document);
  const beforeTris = countSceneTriangles(document);
  const beforeMeshes = document.getRoot().listMeshes().length;
  let errorText = '';
  let optimizedInspection = beforeInspection;
  let afterTris = beforeTris;
  let afterMeshes = beforeMeshes;

  const isEnv = relative.startsWith('env/');
  const isHeavySakuraComplex = relative.includes('sakura pass/') && document.getRoot().listMaterials().length > 6;

  try {
    // Convert legacy KHR_materials_pbrSpecularGlossiness so textures & materials optimize uniformly
    await document.transform(metalRough());

    if (isEnv) {
      stripUnusedEnvMapsAndTangents(document);
      thinDenseFoliageSoup(document, 5200);
    }

    await document.transform(
      dedup(),
      flatten(),
      palette({ min: 4 }),
      join({
        keepNamed: false,
        filter: isEnv
          ? undefined
          : (node) =>
              !/wheel|tire|rim|tyre/i.test(
                `${node.getName() || ''} ${node.getMesh()?.getName() || ''}`,
              ),
      }),
      weld(),
      prune(),
    );

    const midTris = countSceneTriangles(document);
    const targetTris = isEnv ? 5200 : 18000;
    const minRatio = isEnv ? 0.04 : 0.18;
    const ratio = midTris <= targetTris ? 1 : Math.max(minRatio, targetTris / Math.max(1, midTris));

    if (ratio < 0.98) {
      const simplifyError = isEnv ? (midTris > 10000 ? 0.42 : 0.18) : 0.015;
      await document.transform(
        simplify({
          simplifier: MeshoptSimplifier,
          ratio,
          error: simplifyError,
        }),
      );
    }

    await document.transform(
      prune(),
      reorder({ encoder: MeshoptEncoder }),
      quantize({
        quantizePosition: 14,
        quantizeNormal: 10,
        quantizeColor: 8,
        quantizeGeneric: 12,
      }),
    );

    await compressTexturesLossAware(document, isEnv, isHeavySakuraComplex);

    await document.transform(
      meshopt({
        encoder: MeshoptEncoder,
        level: 'high',
      }),
    );

    afterTris = countSceneTriangles(document);
    afterMeshes = document.getRoot().listMeshes().length;
    optimizedInspection = inspection(document);
    await io.write(tempOutput, document);
  } catch (error) {
    errorText = error.message;
  }

  try {
    const tempExists = await fs.access(tempOutput).then(() => true, () => false);
    if (!errorText && tempExists) {
      const tempBytes = (await fs.stat(tempOutput)).size;
      if (tempBytes <= beforeBytes || (afterTris < beforeTris * 0.65 && tempBytes <= beforeBytes * 1.03)) {
        await fs.rename(tempOutput, output);
      } else {
        await fs.rm(tempOutput, { force: true });
        await fs.copyFile(source, output);
      }
    } else {
      await fs.rm(tempOutput, { force: true });
      await fs.copyFile(source, output);
    }
  } finally {
    await fs.rm(tempOutput, { force: true });
  }

  const afterBytes = (await fs.stat(output)).size;
  const entry = {
    fingerprint: currentFingerprint,
    sourceBytes: beforeBytes,
    optimizedBytes: afterBytes,
    savedBytes: Math.max(0, beforeBytes - afterBytes),
    reduced: afterBytes < beforeBytes,
    beforeTris,
    afterTris,
    beforeMeshes,
    afterMeshes,
    error: errorText,
    sourceInspection: beforeInspection,
    optimizedInspection: errorText ? beforeInspection : optimizedInspection,
  };
  cache[relative] = entry;
  return entry;
}

function makeReport(entries) {
  const totalSource = entries.reduce((sum, [, item]) => sum + item.sourceBytes, 0);
  const totalOutput = entries.reduce((sum, [, item]) => sum + item.optimizedBytes, 0);
  const totalSaved = Math.max(0, totalSource - totalOutput);
  const ratio = totalSource > 0 ? (totalSaved / totalSource) * 100 : 0;
  const totalBeforeTris = entries.reduce((sum, [, item]) => sum + (item.beforeTris ?? 0), 0);
  const totalAfterTris = entries.reduce((sum, [, item]) => sum + (item.afterTris ?? 0), 0);
  const summary = [
    '# GLB optimization report',
    '',
    'Updated whenever a source model is added or changed.',
    '',
    `- Models analyzed: ${entries.length}`,
    `- Source size: ${(totalSource / 1_048_576).toFixed(2)} MB`,
    `- Optimized output size: ${(totalOutput / 1_048_576).toFixed(2)} MB`,
    `- Total size reduction: ${(totalSaved / 1_048_576).toFixed(2)} MB (${ratio.toFixed(1)}%)`,
    `- Total triangles: ${totalBeforeTris.toLocaleString()} -> ${totalAfterTris.toLocaleString()}`,
    '- Cars target <= 26k triangles (preserving wheel nodes) with 512px WebP PBR textures and Meshopt compression.',
    '- Environment props deduplicate, flatten, join meshes, target <= 5.5k triangles, compress baseColor/emissive to 512px WebP, and apply Meshopt compression.',
    '- Original files in `public/models/` are preserved untouched. Optimized copies are written to `public/models-optimized/`.',
    '',
    '| Model | Source | Output | Tris (Before -> After) | Meshes | Result |',
    '|---|---:|---:|---:|---:|---|',
  ];

  for (const [name, item] of entries) {
    const percent = item.sourceBytes ? (item.savedBytes / item.sourceBytes) * 100 : 0;
    const result = item.error
      ? 'Optimizer failed; source copied'
      : item.reduced
        ? `${percent.toFixed(1)}% smaller`
        : 'Simplified / copied';
    summary.push(
      `| ${name} | ${(item.sourceBytes / 1_048_576).toFixed(2)} MB | ${(item.optimizedBytes / 1_048_576).toFixed(2)} MB | ${(item.beforeTris ?? 0).toLocaleString()} -> ${(item.afterTris ?? 0).toLocaleString()} | ${item.beforeMeshes ?? '?'} -> ${item.afterMeshes ?? '?'} | ${result} |`,
    );
  }

  for (const [name, item] of entries) {
    summary.push('', `## ${name}`, '', '### Source geometry and texture statistics', '', '```text', safeCodeBlock(item.sourceInspection), '```');
    summary.push('', '### Optimized output statistics', '', '```text', safeCodeBlock(item.optimizedInspection), '```');
    if (item.error) summary.push('', `Optimizer error: ${item.error}`);
  }
  return `${summary.join('\n')}\n`;
}

async function main() {
  await fs.access(sourceRoot);
  await MeshoptEncoder.ready;
  await MeshoptDecoder.ready;
  await MeshoptSimplifier.ready;
  const dracoDecoder = await draco3d.createDecoderModule();
  io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({
      'draco3d.decoder': dracoDecoder,
      'meshopt.decoder': MeshoptDecoder,
      'meshopt.encoder': MeshoptEncoder,
    });

  const files = await findGlbs(sourceRoot);
  const cache = await readCache();
  let processed = 0;
  let totalSaved = 0;

  for (const file of files) {
    const relative = path.relative(sourceRoot, file).split(path.sep).join('/');
    const oldEntry = cache[relative];
    const currentFingerprint = `${await fingerprint(file)}:${OPTIMIZER_VERSION}`;
    const output = path.join(outputRoot, ...relative.split('/'));
    const outputExists = await fs.access(output).then(() => true, () => false);
    const entry = await processModel(file, cache);
    if (!oldEntry || oldEntry.error || oldEntry.fingerprint !== currentFingerprint || !outputExists) {
      processed++;
    }
    totalSaved += entry.savedBytes;
    await writeCache(cache);
  }

  const entries = files
    .map((file) => [
      path.relative(sourceRoot, file).split(path.sep).join('/'),
      cache[path.relative(sourceRoot, file).split(path.sep).join('/')],
    ])
    .filter((entry) => entry[1]);
  const report = makeReport(entries);
  const previousReport = await fs.readFile(reportPath, 'utf8').catch(() => '');
  if (previousReport !== report) await fs.writeFile(reportPath, report);
  console.log(
    processed === 0
      ? `Model optimization: all ${files.length} source models are unchanged; originals are preserved.`
      : `Model optimization: generated ${processed} optimized copies; saved ${(totalSaved / 1_048_576).toFixed(2)} MB across outputs. Originals are preserved.`,
  );
  console.log(`Detailed model statistics: ${path.relative(root, reportPath)}`);
}

main().catch((error) => {
  console.error('Model optimization could not run:', error.message);
  process.exitCode = 1;
});
