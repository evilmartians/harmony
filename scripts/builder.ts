import * as z from "zod";
import { BuildConfig, PaletteWithFallback } from "./types.ts";
import mustache from "mustache";
import * as path from "@std/path";

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

export type PaletteSource = z.infer<typeof SourceSchema>;

export function defineBuildConfig<C extends BuildConfig>(config: C): C {
  return config;
}

export async function build(
  source: PaletteSource,
  dir: string,
  configs: BuildConfig[],
): Promise<string[]> {
  // STEP 1: parse palette from source
  const parsed = SourceSchema.parse(source);

  // STEP 2: prepare palette into disgestive array for easier processing during build
  const map = new Map<string, PaletteWithFallback[number]>();
  for (const [key, value] of Object.entries(parsed)) {
    const [colorName, shadeName] = key.split("/");
    let color = map.get(colorName);
    if (!color) {
      color = { colorName, shades: [] };
      map.set(colorName, color);
    }
    color.shades.push({
      shadeName,
      oklch: value.$oklch,
      srgbFallback: value.$srgbFallback,
    });
  }
  const palette: PaletteWithFallback = Array.from(map.values());

  // STEP 3: clean output dir to avoid stale files
  try {
    await Deno.remove(dir, { recursive: true });
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
  }

  // STEP 4: build targets
  const filepaths = await Promise.all(configs.flatMap((config) => {
    const target = typeof config === "function" ? config(palette) : config;
    return target.outputs.map(async (output) => {
      const template = await Deno.readTextFile(output.templatePath);
      const vars = output.templateVars ?? { palette };
      const content = mustache.render(template, vars);
      const targetDir = path.join(dir, target.dir);
      const targetFile = path.join(targetDir, output.file);
      await Deno.mkdir(targetDir, { recursive: true });
      await Deno.writeTextFile(targetFile, content);

      return targetFile;
    });
  }));

  return filepaths;
}
