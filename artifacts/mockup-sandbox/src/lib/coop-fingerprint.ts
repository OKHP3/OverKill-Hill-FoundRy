/** A generated file represented by its portable path and UTF-8 text content. */
export interface FingerprintFile {
  path: string;
  content: string;
}

const encoder = new TextEncoder();

function comparePaths(left: string, right: string): number {
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const length = Math.min(leftBytes.length, rightBytes.length);
  for (let index = 0; index < length; index += 1) {
    if (leftBytes[index] !== rightBytes[index]) {
      return leftBytes[index] - rightBytes[index];
    }
  }
  return leftBytes.length - rightBytes.length;
}

function writeUint32(value: number): Uint8Array {
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, value, false);
  return bytes;
}

function frame(files: readonly FingerprintFile[]): Uint8Array {
  const sorted = [...files].sort((left, right) => comparePaths(left.path, right.path));
  const seen = new Set<string>();
  const chunks: Uint8Array[] = [writeUint32(sorted.length)];

  for (const file of sorted) {
    if (seen.has(file.path)) {
      throw new Error(`Duplicate fingerprint path: ${file.path}`);
    }
    seen.add(file.path);
    const path = encoder.encode(file.path);
    const content = encoder.encode(file.content);
    chunks.push(writeUint32(path.length), path, writeUint32(content.length), content);
  }

  const totalLength = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

/** Return the lowercase SHA-256 digest of a canonically framed file set. */
export async function fingerprintFiles(
  files: readonly FingerprintFile[],
): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest("SHA-256", frame(files));
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
