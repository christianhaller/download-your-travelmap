import { parseUser } from "./parseUser.ts";

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("parseUser", async () => {
  const str = await Deno.readTextFile("./fixtures/map.html");
  const actual = parseUser(str);
  assertEquals(actual, "agaraizar");
});
