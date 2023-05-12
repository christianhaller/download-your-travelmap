import { assertEquals } from "../../deps.ts";
import app from "../../api/highscore.ts";

Deno.test({
  name: "highscore",
  sanitizeResources: false,
  fn: async () => {
    Deno.env.set("APP_ENV", "development");
    const res = await app({
      url: "/?alltime",
    } as unknown as Request);
    assertEquals(res.status, 200);
  },
});

Deno.test({
  name: "highscore",
  sanitizeResources: false,
  fn: async () => {
    Deno.env.set("APP_ENV", "fail");

    const res = await app({
      url: "/?alltime",
    } as unknown as Request);
    assertEquals(res.status, 400);
  },
});
