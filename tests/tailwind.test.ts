import { expectBuildToMatchSnapshot } from "./utils.ts";
import tailwind from "../scripts/targets/tailwind/tailwind.config.ts";

Deno.test("build tailwind target", async (t) => {
  await expectBuildToMatchSnapshot(t, tailwind);
});
