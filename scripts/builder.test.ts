import { stub } from "@std/testing/mock";
import { assert, assertRejects } from "@std/assert";
import { sandbox } from "@lambdalisue/sandbox";

import { testPaletteSource } from "../tests/utils.ts";
import base from "./targets/base/base.config.ts";
import { build } from "./builder.ts";

Deno.test("should abort and clean up if Deno.remove throws unexpect error", async () => {
  const errorMessage = "some Deno.remove error";
  const stubbed = stub(Deno, "remove", () => {
    throw new Error(errorMessage);
  });

  const sbox = await sandbox();
  try {
    await build(testPaletteSource, sbox.path, [base]);
  } catch (e) {
    assert(e instanceof Error);
    assert(e.message === errorMessage);
  } finally {
    stubbed.restore();
    await sbox[Symbol.asyncDispose]();
  }
  assert(stubbed.calls.length === 1);
  await assertRejects(() => Deno.lstat(sbox.path));
});
