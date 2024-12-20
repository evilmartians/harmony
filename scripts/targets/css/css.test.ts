import { expectBuildToMatchSnapshot } from "../../../tests/utils.ts";
import css from "./css.config.ts";

Deno.test("build css target", async (t) => {
  await expectBuildToMatchSnapshot(t, css);
});
