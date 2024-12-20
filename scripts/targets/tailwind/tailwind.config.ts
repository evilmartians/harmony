import * as path from "@std/path";
import { defineBuildConfig } from "../../builder.ts";
import { PaletteWithFallback } from "../../types.ts";

export default defineBuildConfig((palette) => ({
  dir: "tailwind",
  outputs: [
    ...["index.css", "index.d.ts"].map((file) => ({
      templatePath: path.join(import.meta.dirname!, `templates/${file}.template`),
      file,
    })),
    ...["index.js", "index.cjs"].map((file) => ({
      templatePath: path.join(import.meta.dirname!, `templates/${file}.template`),
      templateVars: {
        palette,
        oklchWithAlpha: function () {
          const shade = this as unknown as PaletteWithFallback[number]["shades"][number];
          return shade.oklch.slice(0, -1) +
            " / <alpha-value>)";
        },
      },
      file,
    })),
  ],
}));
