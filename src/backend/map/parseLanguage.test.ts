// @ts-ignore
import { readFileStr } from "https://deno.land/std/fs/mod.ts";
// @ts-ignore
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
// @ts-ignore
import { parseLanguage } from "./parseLanguage.ts";

Deno.test("parseLanguage", async () => {
  const str = await readFileStr("./fixtures/map.html", {
    encoding: "utf8",
  });
  const actual = parseLanguage(str);
  assertEquals(actual, "en");
});
