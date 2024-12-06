import * as path from "@std/path";
import { sandbox } from "@lambdalisue/sandbox";
import { assertSnapshot } from "@std/testing/snapshot";

import { build, PaletteSource } from "../scripts/builder.ts";
import { BuildConfig } from "../scripts/types.ts";

export const testPaletteSource = {
  "Red/50": {
    "$oklch": "oklch(0.988281 0.0046875 20)",
    "$srgbFallback": "#fefafa",
  },
  "Red/500": {
    "$oklch": "oklch(0.742188 0.151562 20)",
    "$srgbFallback": "#fc8083",
  },
  "Orange/100": {
    "$oklch": "oklch(0.966797 0.0171875 43.3333)",
    "$srgbFallback": "#fff1eb",
  },
} satisfies PaletteSource;

export async function expectBuildToMatchSnapshot(context: Deno.TestContext, config: BuildConfig) {
  const sbox = await sandbox();
  try {
    const filepaths = await build(testPaletteSource, sbox.path, [config]);
    await Promise.all(filepaths.map(async (filepath) => {
      const content = await Deno.readTextFile(filepath);
      await assertSnapshot(context, content, {
        name: path.basename(filepath),
      });
    }));
  } finally {
    await sbox[Symbol.asyncDispose]();
  }
  return sbox.path;
}
