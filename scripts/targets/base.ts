import type { ExportTarget } from "../types.ts";
import { path } from "../deps.ts";
import {
  generateCJS,
  generateEsm,
  generateTypes,
  simplifyPalette,
} from "../utils.ts";

export const buildBasicPalette: ExportTarget = async (
  { palette: paletteWithFallback, targetDir },
) => {
  const palette = simplifyPalette(paletteWithFallback);
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
