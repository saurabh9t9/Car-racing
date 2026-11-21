/**
 * Checks whether an ArrayBuffer starts with the 4-byte binary glTF ("glTF") magic header
 * and meets the minimum 12-byte GLB header length, preventing HTML error/fallback pages
 * from being parsed or persisted as 3D models.
 */
export function isValidGlbBuffer(buffer: ArrayBuffer): boolean {
  if (!buffer || buffer.byteLength < 12) return false;
  const bytes = new Uint8Array(buffer, 0, 4);
  return bytes[0] === 0x67 && bytes[1] === 0x6c && bytes[2] === 0x54 && bytes[3] === 0x46;
}
