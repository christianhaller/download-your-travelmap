import { getUrl } from "./url.ts";
import { assertEquals, assertThrows } from "../../deps.ts";
// import {ServerRequest} from './deps.ts'

Deno.test({
  name: "responds with url",
  fn: async () => {
    const req = ({
      url:
        "https://download-your-travelmap.christianhaller.com?url=http://www.tripadvisor.com/members/christianhaller",
    } as unknown) as any;

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
    } as unknown) as any;

    assertThrows(
      (): void => {
        getUrl(req);
      },
      Error,
      "no url set",
    );
  },
});
