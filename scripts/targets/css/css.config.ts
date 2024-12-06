import * as path from "@std/path";
import { defineBuildConfig } from "../../builder.ts";

export default defineBuildConfig((colors) => ({
  dir: "css",
  outputs: [
    {
      templatePath: path.join(import.meta.dirname!, "templates/index.css.template"),
      file: "index.css",
    },
    ...colors.map((color) => ({
      templatePath: path.join(import.meta.dirname!, "templates/[color].css.template"),
      templateVars: { ...color },
      file: `${color.colorName}.css`,
    })),
  ],
}));
