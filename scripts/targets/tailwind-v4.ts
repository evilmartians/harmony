import * as path from "@std/path";
import type { ExportTarget } from "../types.ts";

const css = String.raw;

export const buildTailwindv4Palette: ExportTarget = async (
  { palette, targetDir },
) => {
  const vars: string[] = [];

  for (const [color, shades] of Object.entries(palette)) {
    for (const [shade, value] of Object.entries(shades)) {
      vars.push(`--color-${color}-${shade}:${value.oklch};`);
    }
    vars.push("");
  }

  const template = css`
@theme {
  --color-*: initial;

  --color-white: #fff;
  --color-black: #000;

  ${vars.join("\n  ")}
}`;

  await Deno.writeTextFile(path.join(targetDir, "index.css"), template);
};
