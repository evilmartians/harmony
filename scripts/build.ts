import * as z from "https://esm.sh/v132/zod@3.22.2";
import { fs, path } from "./deps.ts";
import { buildTailwindPalette } from "./targets/tailwind.ts";
import { buildBasicPalette } from "./targets/base.ts";
//
// Config
//
const SOURCE_FILE = "./source.json";
const DEST_DIR = path.join(Deno.cwd(), "dest");

//
// Export targets
//
const TARGETS = [
  {
    targetDir: "base",
    target: buildBasicPalette,
  },
  {
    targetDir: "tailwind",
    target: buildTailwindPalette,
  },
];

//
// Source file schema
//
const SourceSchema = z.record(
  z.string().regex(/\w+\/\d+/).toLowerCase(),
  z.object({
    $description: z.string(),
  }),
);

//
// Internal types
//
export type Palette = {
  [key: string]: {
    [key: string]: string;
  };
};

export type ExportTarget = (args: {
  targetDir: string;
  palette: Palette;
}) => Promise<void>;

//
// Main
//
await createDistDir(DEST_DIR);
const palette = await loadPalette(SOURCE_FILE);
await Promise.all(
  TARGETS.map(({ targetDir, target }) =>
    runExportTarget(path.join(DEST_DIR, targetDir), target, palette)
  ),
);

//
// Helper functions
//
async function loadPalette(fileName: string): Promise<Palette> {
  const content = await Deno.readTextFile(fileName);
  const sourcePalette = SourceSchema.parse(JSON.parse(content.toString()));

  const result: Palette = {};

  for (const [key, value] of Object.entries(sourcePalette)) {
    const [name, shade] = key.split("/") as [string, string];
    if (!result[name]) {
      result[name] = {};
    }
    result[name][shade] = value.$description;
  }

  return result;
}

async function runExportTarget(
  targetDir: string,
  target: ExportTarget,
  palette: Palette,
) {
  await Deno.mkdir(targetDir, { recursive: true });
  await target({ targetDir, palette });
}

async function createDistDir(dir: string) {
  if (await fs.exists(dir)) {
    await Deno.remove(dir, { recursive: true });
  }
  await Deno.mkdir(dir);
}
