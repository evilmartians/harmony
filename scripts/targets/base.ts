import type { ExportTarget } from "../build.ts";
import { path } from "../deps.ts";
import { makeCJS } from "../utils.ts";

export const buildBasicPalette: ExportTarget = async (
  { palette, targetDir },
) => {
  const content = makeCJS(palette);
  await Deno.writeTextFile(path.join(targetDir, "index.js"), content);
};
