import * as z from "zod";
import * as path from "@std/path";
import { buildTailwindPalette } from "./targets/tailwind.ts";
import { buildBasicPalette } from "./targets/base.ts";
import { ExportTarget, PaletteWithFallback } from "./types.ts";
import { buildCssVars } from "./targets/cssVariables.ts";
import { buildTailwindv4Palette } from "./targets/tailwind-v4.ts";

//
// Config
//
const SOURCE_FILE = "./source.json";
const DIST_DIR = path.join(Deno.cwd(), "dist");
const EXPORT_TARGETS = [
  {
    targetDir: "base",
    target: buildBasicPalette,
  },
  {
    targetDir: "tailwind",
    target: buildTailwindPalette,
  },
  {
    targetDir: "tailwind",
    target: buildTailwindv4Palette,
  },
  {
    targetDir: "css",
    target: buildCssVars,
  },
];

//
// SOURCE_FILE schema
//
const SourceSchema = z.record(
  z.string().regex(/\w+\/\d+/).toLowerCase().describe(
    'Color name and shade. Example: "red/500"',
  ),
  z.object({
    $oklch: z.string().describe(
      'Color in Oklch format. Example: "oklch(98.83% 0.005 20)"',
    ),
    $srgbFallback: z.string().describe(
      'Fallback color in sRGB format. Example: "#ffffff"',
    ),
  }),
);

//
// Main
//
await createDistDir(DIST_DIR);
const palette = await loadPalette(SOURCE_FILE);
await Promise.all(
  EXPORT_TARGETS.map(({ targetDir, target }) =>
    runExportTarget(path.join(DIST_DIR, targetDir), target, palette)
  ),
);

//
// Helper functions
//
async function loadPalette(fileName: string): Promise<PaletteWithFallback> {
  const content = await Deno.readTextFile(fileName);
  const sourcePalette = SourceSchema.parse(JSON.parse(content.toString()));

  const result: PaletteWithFallback = {};

  for (const [key, value] of Object.entries(sourcePalette)) {
    const [name, shade] = key.split("/") as [string, string];
    if (!result[name]) {
      result[name] = {};
    }
    result[name][shade] = {
      oklch: value.$oklch,
      rgbFallback: value.$srgbFallback,
    };
  }

  return result;
}

async function runExportTarget(
  targetDir: string,
  target: ExportTarget,
  palette: PaletteWithFallback,
) {
  await Deno.mkdir(targetDir, { recursive: true });
  await target({ targetDir, palette });
}

async function createDistDir(dir: string) {
  try {
    await Deno.remove(dir, { recursive: true });
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
  }
  await Deno.mkdir(dir);
}
