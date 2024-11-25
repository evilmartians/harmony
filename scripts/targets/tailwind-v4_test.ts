import { buildTailwindv4Palette } from "./tailwind-v4.ts";
import { testExportTarget } from "./testUtils.ts";

Deno.test("Tailwind v4 palette theme override", async (t) => {
  await testExportTarget(t, buildTailwindv4Palette, [
    "index.css",
  ]);
});

