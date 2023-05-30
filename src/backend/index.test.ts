import { assertEquals } from "../../deps.ts";

import app from "../../api/index.ts";

Deno.test({
  name: "index",
  sanitizeResources: false,
  fn: async () => {
    Deno.env.set("APP_ENV", "development");
    const res = await app({
      url:
        "https://download-your-travelmap.christianhaller.com/?url=https%3A%2F%2Fwww.tripadvisor.com%2FTravelMap-a_uid.793EEF266391AE7A70AAA05EEAC5D8B4",
    } as Request);
    assertEquals(res.status, 200);
  },
});
