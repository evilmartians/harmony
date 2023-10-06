import { snapshot } from "../deps.ts";
import { ExportTarget, PaletteWithFallback } from "../types.ts";

export function getTestPalette(): PaletteWithFallback {
  return {
    red: {
      100: { oklch: "oklch(0.966797 0.0171875 20)", rgbFallback: "#fff0ef" },
      500: { oklch: "oklch(0.742188 0.151562 20)", rgbFallback: "#fc8083" },
    },
    orange: {
      100: {
        oklch: "oklch(0.966797 0.0171875 43.3333)",
        rgbFallback: "#fff1eb",
      },
    },
  };
}

export async function getExportTargetArgs() {
  const palette = getTestPalette();
  const targetDir = await Deno.makeTempDir();

  return { palette, targetDir };
}

export async function testExportTarget(
  t: Deno.TestContext,
  target: ExportTarget,
  files: string[],
) {
  const args = await getExportTargetArgs();
  await target(args);

  for (const file of files) {
    await snapshot.assertSnapshot(
      t,
      await Deno.readTextFile(`${args.targetDir}/${file}`),
    );
  }
}
