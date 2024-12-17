import { expectBuildToMatchSnapshot } from "../../../tests/utils.ts";
import tailwind from "./tailwind.config.ts";

Deno.test("build tailwind target", async (t) => {
  await expectBuildToMatchSnapshot(t, tailwind);
});
