import * as path from "@std/path";
import { defineBuildConfig } from "../../builder.ts";

export default defineBuildConfig({
  dir: "base",
  outputs: ["index.js", "index.cjs", "index.d.ts"].map((file) => ({
    templatePath: path.join(import.meta.dirname!, `templates/${file}.template`),
    file,
  })),
});
