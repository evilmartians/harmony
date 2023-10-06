import { buildBasicPalette } from "./base.ts";
import { testExportTarget } from "./testUtils.ts";

Deno.test("base export", async (t) => {
  await testExportTarget(t, buildBasicPalette, [
    "index.js",
    "index.mjs",
    "index.d.ts",
  ]);
});
