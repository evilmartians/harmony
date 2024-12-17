import * as path from "@std/path";
import { build } from "./builder.ts";
import base from "./targets/base/base.config.ts";
import css from "./targets/css/css.config.ts";
import tailwind from "./targets/tailwind/tailwind.config.ts";
import source from "../source.json" with { type: "json" };

const configs = [base, css, tailwind];
const dir = path.join(Deno.cwd(), "dist");

await build(source, dir, configs);
