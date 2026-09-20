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
export interface DisplayEditRange {
  start: number;
  end: number;
  inputType: string;
}

export function mergeDisplayEdit(raw: string, edited: string, range?: DisplayEditRange): string {
  const displayed = raw.replace(/\r\n?/g, "\n");
  if (range) {
    let { start, end } = range;
    const removedLength = displayed.length - edited.length;
    // A collapsed selection describes the caret before native deletion.
    if (start === end && removedLength > 0) {
      if (range.inputType.endsWith("Backward")) start = Math.max(0, start - removedLength);
      else if (range.inputType.endsWith("Forward")) end = Math.min(displayed.length, end + removedLength);
    }
    const insertedLength = edited.length - (displayed.length - (end - start));
    if (insertedLength >= 0 && edited.slice(0, start) === displayed.slice(0, start)
        && edited.slice(start + insertedLength) === displayed.slice(end)) {
      return raw.slice(0, rawOffsetForDisplayOffset(raw, start)) + edited.slice(start, start + insertedLength)
        + raw.slice(rawOffsetForDisplayOffset(raw, end));
    }
  }
  // Events without a native beforeinput range (for example, whole-value fills)
  // retain unchanged outer spans. Native typing/deletion uses the range above.

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
