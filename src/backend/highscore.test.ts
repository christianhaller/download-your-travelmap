import { assertEquals } from "../../deps.ts";
import app from "../../api/highscore.ts";

Deno.test({
  name: "highscore",
  sanitizeResources: false,
  fn: async () => {
    Deno.env.set("APP_ENV", "development");
    const res = await app({
      request: {
        url: "/?alltime",
      },
    } as unknown as Deno.RequestEvent);
    assertEquals(res.status, 200);
  },
});

Deno.test({
  name: "highscore",
  sanitizeResources: false,
  fn: async () => {
    Deno.env.set("APP_ENV", "fail");

    const res = await app({
      request: {
        url: "/?alltime",
      },
    } as unknown as Deno.RequestEvent);
    assertEquals(res.status, 400);
  },
});
