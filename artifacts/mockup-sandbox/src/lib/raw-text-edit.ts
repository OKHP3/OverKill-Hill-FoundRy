/** Map the textarea's normalized offsets back to the stored text bytes. */
export function rawOffsetForDisplayOffset(value: string, displayOffset: number): number {
  let rawOffset = 0;
  let visibleOffset = 0;
  while (rawOffset < value.length && visibleOffset < displayOffset) {
    rawOffset += value[rawOffset] === "\r" && value[rawOffset + 1] === "\n" ? 2 : 1;
    visibleOffset += 1;
  }
  return rawOffset;
}

/** Preserve untouched CR/CRLF text when native edits report LF-normalized values. */
export function mergeDisplayEdit(raw: string, edited: string): string {
  const displayed = raw.replace(/\r\n?/g, "\n");
  let start = 0;
  while (start < displayed.length && start < edited.length && displayed[start] === edited[start]) start++;
  let oldEnd = displayed.length;
  let newEnd = edited.length;
  while (oldEnd > start && newEnd > start && displayed[oldEnd - 1] === edited[newEnd - 1]) {
    oldEnd--;
    newEnd--;
  }
  return raw.slice(0, rawOffsetForDisplayOffset(raw, start)) + edited.slice(start, newEnd) + raw.slice(rawOffsetForDisplayOffset(raw, oldEnd));
}
