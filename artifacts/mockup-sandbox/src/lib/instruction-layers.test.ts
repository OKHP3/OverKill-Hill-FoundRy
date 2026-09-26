import assert from "node:assert/strict";
import test from "node:test";
import { INSTRUCTION_LAYERS } from "../data/knowledge.ts";
import { formatInstructionLayers } from "./instruction-layers.ts";

const heading = (layer: (typeof INSTRUCTION_LAYERS)[number]) => `Layer ${layer.id}`;

test("returns no content for missing or non-string layer values", () => {
  assert.equal(formatInstructionLayers({}, heading), "");
  assert.equal(
    formatInstructionLayers(
      { 1: 42, 2: null, 3: {}, 4: true, 5: ["not text"] },
      heading,
    ),
    "",
  );
});

test("omits whitespace-only layer values", () => {
  assert.equal(
    formatInstructionLayers(
      { 1: "   ", 2: "\t\r\n", 3: "\n \r\t" },
      heading,
    ),
    "",
  );
});

test("uses configured layer order and preserves populated content exactly", () => {
  const contentByLayer = {
    1: "  leading and trailing spaces  \r\n日本語",
    3: "line one\nline two\rline three",
    8: "最後の層 — keep this exact",
  };

  const expected = INSTRUCTION_LAYERS
    .filter((layer) => layer.id in contentByLayer)
    .map((layer) => `${heading(layer)}\n${contentByLayer[layer.id]}`)
    .join("\n\n");

  assert.equal(
    formatInstructionLayers(
      {
        8: contentByLayer[8],
        3: contentByLayer[3],
        1: contentByLayer[1],
      },
      heading,
    ),
    expected,
  );
});