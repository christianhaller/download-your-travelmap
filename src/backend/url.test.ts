import { getUrl } from "./url.ts";
import { assertEquals, assertThrows, ServerRequest } from "../../deps.ts";

Deno.test({
  name: "responds with url",
  fn: () => {
    const req = {
      url: "https://download-your-travelmap.christianhaller.com?url=http://www.tripadvisor.com/members/christianhaller",
    } as unknown as ServerRequest;

    const sut = getUrl(req);
    assertEquals(
      sut.href,
      "http://www.tripadvisor.com/members/christianhaller"
    );
  },
});

Deno.test({
  name: "throws error",
  fn: () => {
    const req = {
      url: "https://download-your-travelmap.christianhaller.com",
    } as unknown as ServerRequest;

    assertThrows(
      (): void => {
        getUrl(req);
      },
      Error,
      "no url set"
    );
  },
});
