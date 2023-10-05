import type { ExportTarget } from "../build.ts";
import { path } from "../deps.ts";
import { generateCJS, generateEsm, generateTypes } from "../utils.ts";

export const buildBasicPalette: ExportTarget = async (
  { palette, targetDir },
) => {
  const content = generateCJS(palette);
  await Deno.writeTextFile(path.join(targetDir, "index.js"), content);
  await Deno.writeTextFile(
    path.join(targetDir, "index.mjs"),
    generateEsm(palette),
  );
  await Deno.writeTextFile(
    path.join(targetDir, "index.d.ts"),
    generateTypes(palette),
  );
};
