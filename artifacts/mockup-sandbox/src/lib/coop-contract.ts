/** Experimental, standalone parser for small versioned JSON contracts. */

export type ContractPrimitive = "string" | "number" | "boolean" | "null";

export type ContractField = {
  type: ContractPrimitive;
  required?: boolean;
};

export type ContractSchema = {
  version: number;
  fields: Record<string, ContractField>;
};

export class ContractParseError extends Error {
  readonly path: string;

  constructor(path: string, message: string) {
    super(`${path}: ${message}`);
    this.name = "ContractParseError";
    this.path = path;
  }
}

export function parseContract(
  input: string,
  schema: ContractSchema,
): Record<string, unknown> {
  let value: unknown;
  try {
    value = JSON.parse(input);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "invalid JSON";
    throw new ContractParseError("$", detail);
  }

  rejectDuplicateKeys(input);
  if (!isRecord(value)) throw new ContractParseError("$", "expected an object");

  if (!("version" in value)) {
    throw new ContractParseError("$.version", "required field is missing");
  }
  if (typeof value.version !== "number" || !Number.isInteger(value.version)) {
    throw new ContractParseError("$.version", "expected an integer");
  }
  if (value.version !== schema.version) {
    throw new ContractParseError("$.version", `unsupported version ${String(value.version)}`);
  }

  const allowed = new Set(["version", ...Object.keys(schema.fields)]);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) throw new ContractParseError(`$.${key}`, "unknown field");
  }
  for (const [name, field] of Object.entries(schema.fields)) {
    const path = `$.${name}`;
    if (!(name in value)) {
      if (field.required) throw new ContractParseError(path, "required field is missing");
      continue;
    }
    if (!matchesPrimitive(value[name], field.type)) {
      throw new ContractParseError(path, `expected ${field.type}`);
    }
  }
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function matchesPrimitive(value: unknown, type: ContractPrimitive): boolean {
  if (type === "null") return value === null;
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  return typeof value === type;
}

/** JSON.parse silently keeps the last duplicate key; contracts must reject that loss. */
function rejectDuplicateKeys(source: string): void {
  let index = 0;
  const skipSpace = () => { while (/\s/.test(source[index] ?? "")) index += 1; };
  const readString = () => {
    const start = index;
    index += 1;
    while (index < source.length) {
      if (source[index] === "\\") index += 2;
      else if (source[index++] === '"') return JSON.parse(source.slice(start, index)) as string;
    }
    return "";
  };
  const scan = () => {
    skipSpace();
    if (source[index] === '"') { readString(); return; }
    if (source[index] === "{") {
      index += 1; const keys = new Set<string>(); skipSpace();
      if (source[index] === "}") { index += 1; return; }
      while (index < source.length) {
        skipSpace(); const key = readString(); skipSpace(); index += 1;
        if (keys.has(key)) throw new ContractParseError("$", `duplicate field ${JSON.stringify(key)}`);
        keys.add(key); scan(); skipSpace();
        if (source[index] === "}") { index += 1; return; }
        index += 1;
      }
      return;
    }
    if (source[index] === "[") {
      index += 1; skipSpace();
      while (source[index] !== "]") { scan(); skipSpace(); if (source[index] === ",") { index += 1; skipSpace(); } }
      index += 1; return;
    }
    while (index < source.length && !",]}".includes(source[index])) index += 1;
  };
  scan();
}
