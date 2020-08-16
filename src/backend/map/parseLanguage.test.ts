// @ts-ignore
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
// @ts-ignore
import { parseLanguage } from "./parseLanguage.ts";

Deno.test("parseLanguage", async () => {
  const str = await Deno.readTextFile("./fixtures/map.html");
  const actual = parseLanguage(str);
  assertEquals(actual, "en");
});
