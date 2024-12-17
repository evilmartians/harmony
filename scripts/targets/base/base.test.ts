import { expectBuildToMatchSnapshot } from "../../../tests/utils.ts";
import base from "./base.config.ts";

Deno.test("build base target", async (t) => {
  await expectBuildToMatchSnapshot(t, base);
});
