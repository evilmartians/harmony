import { path } from "../deps.ts";
import type { ExportTarget, PaletteWithFallback } from "../types.ts";

export const buildCssVars: ExportTarget = async (
  { palette, targetDir },
) => {
  for (const [colorName, shades] of Object.entries(palette)) {
    const oklchVars = generateCssVarsForColor(colorName, shades, "oklch");
    const fallbackVars = generateCssVarsForColor(
      colorName,
      shades,
      "rgbFallback",
    );

    await Deno.writeTextFile(
      path.join(targetDir, `${colorName}.css`),
      cssFileTemplate(oklchVars, fallbackVars),
    );
  }
};

function cssFileTemplate(oklchVars: string[], fallbackVars: string[]) {
  return `:root {
${fallbackVars.map((v) => `  ${v}`).join("\n")}
}

@supports (color: oklch(0% 0 0)) {
  @media (color-gamut: p3) {
    :root {
${oklchVars.map((v) => `      ${v}`).join("\n")}
    }
  }
}
`;
}

export function generateCssVarsForColor(
  color: string,
  shades: Record<string, { oklch: string; rgbFallback: string }>,
  prop: keyof PaletteWithFallback[string][string],
) {
  const cssVars = [];
  for (const [shade, value] of Object.entries(shades)) {
    cssVars.push(`--${color}-${shade}: ${value[prop]};`);
  }
  return cssVars;
}
