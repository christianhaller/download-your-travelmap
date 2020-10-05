// @ts-ignore
import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
// @ts-ignore
import { request } from "./request.ts";
// @ts-ignore
import { stub } from "https://deno.land/x/mock@v0.7.0/stub.ts";

Deno.test({
  name: "sends response",
  fn: async () => {
    const s = stub(self, "fetch");
    s.returns = [
      {
        ok: true,
        text: () => {
          return "foo";
        },
      },
    ];

    const res = await request(new URL("https://christianhaller.com"));
    assertEquals(res, "foo");
    s.restore();
  },
});

Deno.test({
  name: "throws",
  fn: async () => {
    const s = stub(self, "fetch");
    s.returns = [{ ok: false, text: () => {} }];

    assertThrowsAsync(
      async () => {
        await request(new URL("https://christianhaller.com"));
      },
      Error,
      "url https://christianhaller.com/ is not ok",
    );
    s.restore();
  },
});
