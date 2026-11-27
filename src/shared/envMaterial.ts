export interface EnvMaterialInput {
  name: string;
  isTransparent: boolean;
  alphaTest: number;
  hasAlphaMap: boolean;
  isDoubleSided: boolean;
  vertexColors: boolean;
}

export interface ResolvedEnvMaterialFlags {
  transparent: boolean;
  alphaTest: number;
  depthWrite: boolean;
  doubleSided: boolean;
  opacity: number;
  vertexColors: boolean;
}

/**
 * Resolves WebGL material render flags for normalized environment GLBs.
 * Foliage/leaf/blossom textures exported as alphaMode=BLEND are promoted to crisp
 * double-sided alpha-cutout (alphaTest) so InstancedMesh foliage never turns into
 * solid opaque dark boxes or suffers transparent depth-sorting artifacts.
 */
export function resolveEnvMaterialFlags(input: EnvMaterialInput): ResolvedEnvMaterialFlags {
  const lower = (input.name || '').toLowerCase();
  if (lower.includes('glass')) {
    return {
      transparent: true,
      alphaTest: 0,
      depthWrite: false,
      doubleSided: true,
      opacity: 0.55,
      vertexColors: input.vertexColors,
    };
  }

  const hasAlphaCutout =
    input.isTransparent || input.alphaTest > 0 || input.hasAlphaMap;

  if (hasAlphaCutout) {
    return {
      transparent: false,
      alphaTest: Math.max(input.alphaTest || 0, 0.36),
      depthWrite: true,
      doubleSided: true,
      opacity: 1,
      vertexColors: input.vertexColors,
    };
  }

  return {
    transparent: false,
    alphaTest: 0,
    depthWrite: true,
    doubleSided: input.isDoubleSided,
    opacity: 1,
    vertexColors: input.vertexColors,
  };
}
