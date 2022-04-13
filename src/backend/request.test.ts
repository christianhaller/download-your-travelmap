import { request } from "./request.ts";
import { assertEquals, assertRejects, stub, resolvesNext } from "../../deps.ts";

Deno.test({
  name: "sends response",
  fn: async () => {
    const s = stub(
      self,
      "fetch",
      resolvesNext([
        {
          ok: true,
          text: () => {
            return "foo";
          },
        },
      ])
    );

    const res = await request(new URL("https://christianhaller.com"));
    assertEquals(res, "foo");
    s.restore();
  },
});

Deno.test({
  name: "throws",
  fn: () => {
    const s = stub(
      self,
      "fetch",
      resolvesNext([{ ok: false, text: () => {} }])
    );

    assertRejects(
      async () => {
        await request(new URL("https://christianhaller.com"));
      },
      Error,
      "url https://christianhaller.com/ is not ok"
    );
    s.restore();
  },
});
