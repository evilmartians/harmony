import type { ExportTarget, Palette } from "../build.ts";
import { assert, path } from "../deps.ts";
import { generateCJS, generateEsm, generateTypes } from "../utils.ts";

export const buildTailwindPalette: ExportTarget = async (
  { palette, targetDir },
) => {
  const twPalette = {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    ...addAlphaChannel(palette),
  };

  const content = generateCJS(twPalette);
  await Deno.writeTextFile(path.join(targetDir, "index.js"), content);
  await Deno.writeTextFile(
    path.join(targetDir, "index.mjs"),
    generateEsm(twPalette),
  );
  await Deno.writeTextFile(
    path.join(targetDir, "index.d.ts"),
    generateTypes(twPalette),
  );
};

/**
 * Adds tailwind's aplpa channel to all colors in the palette
 * Example: oklch(98.83% 0.005 20) -> oklch(98.83% 0.005 20 / <alpha-value>)
 */
function addAlphaChannel(palette: Palette) {
  palette = structuredClone(palette);

  for (const [name, shades] of Object.entries(palette)) {
    for (const [shade, color] of Object.entries(shades)) {
      const val = color.match(/oklch\((.*?)\)/);
      assert(
        val?.length === 2 && val[1],
        `Invalid oklch value for ${name}-${shade}`,
      );
      palette[name][shade] = `oklch(${val[1]} / <alpha-value>)`;
    }
  }

  return palette;
}
