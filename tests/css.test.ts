import { expectBuildToMatchSnapshot } from "./utils.ts";
import css from "../scripts/targets/css/css.config.ts";

Deno.test("build css target", async (t) => {
  await expectBuildToMatchSnapshot(t, css);
});
