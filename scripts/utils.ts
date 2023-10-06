// deno-lint-ignore-file no-explicit-any

import { PaletteWithFallback } from "./types.ts";

/**
 * Removes fallback from palette and simplifies strucutre
 */
export function simplifyPalette(palette: PaletteWithFallback) {
  const result: Record<string, Record<string, string>> = {};
  for (const [key, value] of Object.entries(palette)) {
    result[key] = {};
    for (const [shade, shadeValue] of Object.entries(value)) {
      result[key][shade] = shadeValue.oklch;
    }
  }
  return result;
}

export function generateCJS(content: any) {
  return `'use strict';
module.exports = ${JSON.stringify(content, null, 2)};
Object.defineProperty(exports, '__esModule', { value: true });
`;
}

export function generateEsm(content: any) {
  return `
  export default ${JSON.stringify(content, null, 2)};
`;
}

export function generateTypes(
  content: Record<string, string | Record<string, string>>,
) {
  const types = Object.entries(content)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `  let ${key}: string;`;
      } else {
        const nested = Object.keys(value).map((shade) =>
          `    ${shade}: string;`
        ).join(
          "\n",
        );
        return `  let ${key}: {\n${nested}\n  };`;
      }
    }).join("\n");

  return `declare namespace _default {
${types}
}
export default _default;
`;
}
