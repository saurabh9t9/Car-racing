import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { inspect, meshopt, simplify, textureCompress } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';

const root = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.join(root, 'public', 'models');
const outputRoot = path.join(root, 'public', 'models-optimized');
const cachePath = path.join(root, 'node_modules', '.cache', 'model-optimizer.json');
const reportPath = path.join(root, 'performance-model-report.md');
const OPTIMIZER_VERSION = 'environment-simplify-85-webp90-v2';

let io;

async function findGlbs(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    // OneDrive cloud files can be reparse points, so Dirent.isFile() may be false
    // even though fs.stat() can read the file normally.
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

async function processModel(source, cache) {
  const relative = path.relative(sourceRoot, source).split(path.sep).join('/');
  const output = path.join(outputRoot, ...relative.split('/'));
  const currentFingerprint = `${await fingerprint(source)}:${OPTIMIZER_VERSION}`;
  const previous = cache[relative];

  if (
    previous?.fingerprint === currentFingerprint &&
    !previous.error &&
    await fs.access(output).then(() => true, () => false)
  ) {
    return previous;
  }

  await fs.mkdir(path.dirname(output), { recursive: true });
  const tempOutput = `${output}.tmp.glb`;
  const beforeBytes = (await fs.stat(source)).size;
  const document = await io.read(source);
  const beforeInspection = inspection(document);
  let errorText = '';
  let optimizedInspection = beforeInspection;

  try {
    await document.transform(
      // Retain at least 85% of the source vertex detail, with a strict visual
      // error bound. Textures/materials are left untouched.
      simplify({ simplifier: MeshoptSimplifier, ratio: 0.85, error: 0.002 }),
      textureCompress({
        encoder: sharp,
        targetFormat: 'webp',
        quality: 90,
        effort: 6,
        resize: [2048, 2048],
        slots: /^(baseColorTexture|emissiveTexture)$/,
      }),
      meshopt({
      encoder: MeshoptEncoder,
      level: 'high',
      quantizePosition: 16,
      quantizeNormal: 16,
      quantizeTexcoord: 16,
      quantizeGeneric: 16,
      quantizeColor: 16,
      quantizeWeight: 16,
      }),
    );
    optimizedInspection = inspection(document);
    await io.write(tempOutput, document);
  } catch (error) {
    errorText = error.message;
  }

  try {
    const tempExists = await fs.access(tempOutput).then(() => true, () => false);
    if (!errorText && tempExists && (await fs.stat(tempOutput)).size < beforeBytes) {
      await fs.rename(tempOutput, output);
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
    error: errorText,
    sourceInspection: beforeInspection,
    optimizedInspection: errorText || afterBytes === beforeBytes ? beforeInspection : optimizedInspection,
  };
  cache[relative] = entry;
  return entry;
}

function makeReport(entries) {
  const totalSource = entries.reduce((sum, [, item]) => sum + item.sourceBytes, 0);
  const totalOutput = entries.reduce((sum, [, item]) => sum + item.optimizedBytes, 0);
  const totalSaved = Math.max(0, totalSource - totalOutput);
  const ratio = totalSource > 0 ? (totalSaved / totalSource) * 100 : 0;
  const summary = [
    '# GLB optimization report',
    '',
    'Updated whenever a source model is added or changed.',
    '',
    `- Models analyzed: ${entries.length}`,
    `- Source size: ${(totalSource / 1_048_576).toFixed(2)} MB`,
    `- Optimized output size: ${(totalOutput / 1_048_576).toFixed(2)} MB`,
    `- Total reduction: ${(totalSaved / 1_048_576).toFixed(2)} MB (${ratio.toFixed(1)}%)`,
    '- Only non-car environment GLBs are included; car models and car outputs are untouched.',
    '- Environment geometry targets 85% of source vertex detail with a 0.002 normalized error bound, then uses high-quality Meshopt compression.',
    '- Base-color and emissive textures use quality-90 WebP, capped at 2048px; normal, roughness, and metallic maps are left unchanged.',
    '- Original files are not modified. Optimized copies are written to `public/models-optimized/`.',
    '',
    '| Model | Source | Output | Saved | Result |',
    '|---|---:|---:|---:|---|',
  ];

  for (const [name, item] of entries) {
    const percent = item.sourceBytes ? (item.savedBytes / item.sourceBytes) * 100 : 0;
    const result = item.error ? 'Optimizer failed; source copied' : item.reduced ? `${percent.toFixed(1)}% smaller` : 'No smaller output';
    summary.push(
      `| ${name} | ${(item.sourceBytes / 1_048_576).toFixed(2)} MB | ${(item.optimizedBytes / 1_048_576).toFixed(2)} MB | ${(item.savedBytes / 1_048_576).toFixed(2)} MB | ${result} |`,
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
  const dracoDecoder = await draco3d.createDecoderModule();
  io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({
      'draco3d.decoder': dracoDecoder,
      'meshopt.decoder': MeshoptDecoder,
      'meshopt.encoder': MeshoptEncoder,
    });
  // Car models are deliberately excluded from this optimization workflow.
  const files = (await findGlbs(path.join(sourceRoot, 'env')));
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
    if (!oldEntry || oldEntry.error || oldEntry.fingerprint !== currentFingerprint || !outputExists) processed++;
    totalSaved += entry.savedBytes;
    await writeCache(cache);
  }

  const entries = files
    .map((file) => [path.relative(sourceRoot, file).split(path.sep).join('/'), cache[path.relative(sourceRoot, file).split(path.sep).join('/')]])
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
