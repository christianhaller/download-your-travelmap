import { assertEquals } from "../../deps.ts";
import app from "../../api/highscore.ts";
// vercel env pull
import { config } from "https://deno.land/x/dotenv/mod.ts";

Deno.test({
  name: "highscore",
  sanitizeResources: false,
  fn: async () => {
    config();
    const res = await app({
      request: {
        url: "/?alltime",
      },
    } as unknown as Deno.RequestEvent);
    assertEquals(res.status, 200);
  },
});
