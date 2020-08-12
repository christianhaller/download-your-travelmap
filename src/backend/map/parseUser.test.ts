import { parseUser } from "./parseUser.ts";
import { readFileStr } from "https://deno.land/std/fs/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("parseUser", async () => {
  const str = await readFileStr("./fixtures/map.html", {
    encoding: "utf8",
  });
  const actual = parseUser(str);
  assertEquals(actual, "agaraizar");
});
