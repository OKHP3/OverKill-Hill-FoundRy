import { INSTRUCTION_LAYERS } from "../data/knowledge.ts";

export type InstructionLayer = (typeof INSTRUCTION_LAYERS)[number];

function isRecord(value: unknown): value is Record<string | number, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function formatInstructionLayers(
  layerData: unknown,
  heading: (layer: InstructionLayer) => string,
): string {
  if (!isRecord(layerData)) return "";

  return INSTRUCTION_LAYERS
    .flatMap((layer) => {
      const content = layerData[layer.id];
      return typeof content === "string" && content.trim()
        ? [`${heading(layer)}\n${content}`]
        : [];
    })
    .join("\n\n");
}