import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generatedFiles, makeBackup, roundTripBackup } from "./project.ts";

const root = dirname(fileURLToPath(import.meta.url));
const generatedRoot = join(root, "generated");
await mkdir(generatedRoot, { recursive: true });
for (const file of generatedFiles()) {
  const destination = join(generatedRoot, file.path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, file.content, "utf8");
}
await writeFile(join(root, "backup.json"), `${makeBackup()}\n`, "utf8");
if (roundTripBackup().id !== "prompt-example-action-items") throw new Error("backup roundtrip failed");
console.log(`generated ${generatedFiles().length} files and verified backup roundtrip`);
