import assert from "node:assert/strict";
import test from "node:test";
import { mergeDisplayEdit } from "./raw-text-edit.ts";

test("ordinary typing preserves existing mixed line endings", () => {
  assert.equal(mergeDisplayEdit("a\r\nb\rc\nd", "a\nb\nc\nd!"), "a\r\nb\rc\nd!");
});
test("replacement and deletion preserve untouched raw spans", () => {
  assert.equal(mergeDisplayEdit("first\r\nsecond\rthird", "first\nchanged\nthird"), "first\r\nchanged\rthird");
  assert.equal(mergeDisplayEdit("a\r\nb\rc", "ab\nc"), "ab\rc");
  assert.equal(mergeDisplayEdit("a\r\nb", ""), "");
  assert.equal(mergeDisplayEdit("a\r\nb", "a\nb"), "a\r\nb");
});
