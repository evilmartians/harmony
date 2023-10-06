import { buildTailwindPalette } from "./tailwind.ts";
import { testExportTarget } from "./testUtils.ts";

Deno.test("Tailwind export target", async (t) => {
  await testExportTarget(t, buildTailwindPalette, [
    "index.js",
    "index.mjs",
    "index.d.ts",
  ]);
});
