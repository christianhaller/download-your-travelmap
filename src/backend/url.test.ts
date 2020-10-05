// @ts-ignore
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
// @ts-ignore
import { getUrl } from "./url.ts";
import type { ServerRequest } from "https://deno.land/std/http/server.ts";

Deno.test({
  name: "responds with url",
  fn: async () => {
    const req = ({
      url:
        "https://download-your-travelmap.christianhaller.com?url=http://www.tripadvisor.com/members/christianhaller",
    } as unknown) as ServerRequest;

    const sut = getUrl(req);
    assertEquals(
      sut.href,
      "http://www.tripadvisor.com/members/christianhaller",
    );
  },
});

Deno.test({
  name: "throws error",
  fn: async () => {
    const req = ({
      url: "https://download-your-travelmap.christianhaller.com",
    } as unknown) as ServerRequest;

    assertThrows(
      (): void => {
        getUrl(req);
      },
      Error,
      "no url set",
    );
  },
});
