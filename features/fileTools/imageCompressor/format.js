// Image formats the compressor accepts as input. Canvas's toBlob() only
// respects the quality parameter for jpeg/webp - PNG is always re-encoded
// losslessly regardless of quality, which the UI calls out explicitly.
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Generous but bounded: large enough for real photos, small enough that
// decoding onto a canvas can't hang the tab.
export const MAX_FILE_SIZE_BYTES = 30 * 1024 * 1024;

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = -1;
  do {
    value /= 1024;
    unitIndex += 1;
  } while (value >= 1024 && unitIndex < units.length - 1);

  return `${value.toFixed(value < 10 ? 2 : 1)} ${units[unitIndex]}`;
}

// Positive = the compressed file is smaller; negative means it grew (can
// happen re-encoding an already-optimized PNG).
export function calculateReductionPercent(originalBytes, compressedBytes) {
  if (!originalBytes) return 0;
  return ((originalBytes - compressedBytes) / originalBytes) * 100;
}

export default formatBytes;
