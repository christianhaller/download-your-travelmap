import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";

import { request } from "./request.ts";

import { stub } from "https://deno.land/x/mock/mod.ts";

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
  fn: () => {
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
