import { assertEquals } from "@std/assert";
import { buildCssVars, generateCssVarsForColor } from "./cssVariables.ts";
import { getTestPalette, testExportTarget } from "./testUtils.ts";

Deno.test("generateCssVarsForColor", () => {
  const blue = {
    100: {
      oklch: "oklch(0.1111 0.151562 20)",
      rgbFallback: "#fc8083",
    },
    200: {
      oklch: "oklch(0.2222 0.151562 20)",
      rgbFallback: "#fc8083",
    },
  };

  assertEquals(generateCssVarsForColor("blue", blue, "oklch"), [
    "--blue-100:oklch(0.1111 0.151562 20);",
    "--blue-200:oklch(0.2222 0.151562 20);",
  ]);
  assertEquals(generateCssVarsForColor("blue", blue, "rgbFallback"), [
    "--blue-100:#fc8083;",
    "--blue-200:#fc8083;",
  ]);
});

Deno.test("generateCssVars export target", async (t) => {
  await testExportTarget(
    t,
    buildCssVars,
    Object.keys(getTestPalette())
      .map((color) => `${color}.css`)
      .concat("index.css"),
  );
});
