import { expectBuildToMatchSnapshot } from "./utils.ts";
import base from "../scripts/targets/base/base.config.ts";

Deno.test("build base target", async (t) => {
  await expectBuildToMatchSnapshot(t, base);
});

