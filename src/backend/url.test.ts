import { getUrl } from "./url.ts";
import { assertEquals, assertThrows } from "../../deps.ts";

Deno.test({
  name: "responds with url",
  fn: () => {
    const req = {
      url:
        "https://download-your-travelmap.christianhaller.com?url=http://www.tripadvisor.com/members/christianhaller",
    };

    const sut = getUrl({ request: req } as Deno.RequestEvent);
    assertEquals(
      sut.href,
      "http://www.tripadvisor.com/members/christianhaller",
    );
  },
});

Deno.test({
  name: "throws error",
  fn: () => {
    const request = {
      url: "https://download-your-travelmap.christianhaller.com",
    };

    assertThrows(
      (): void => {
        getUrl({ request } as Deno.RequestEvent);
      },
      Error,
      "no url set",
    );
  },
});
