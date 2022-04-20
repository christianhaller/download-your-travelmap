import { assertEquals } from "../../deps.ts";
// vercel env pull
import { config } from "https://deno.land/x/dotenv/mod.ts";

import app from "../../api/index.ts";

Deno.env.get("APP_AWS_SECRET_ACCESS_KEY");
Deno.test({
  name: "index",
  sanitizeResources: false,
  fn: async () => {
    config();
    const res = await app({
      request: {
        url:
          "https://download-your-travelmap.christianhaller.com/?url=https%3A%2F%2Fwww.tripadvisor.com%2FTravelMap-a_uid.793EEF266391AE7A70AAA05EEAC5D8B4",
      },
    } as unknown as Deno.RequestEvent);
    await res.json();
    assertEquals(res.status, 200);
  },
});
