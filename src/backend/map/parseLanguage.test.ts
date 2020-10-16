// @ts-ignore
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
// @ts-ignore
import { parseLanguage } from "./parseLanguage.ts";

Deno.test("parseLanguage", async () => {
  const str = await Deno.readTextFile("./fixtures/map.html");
  const actual = parseLanguage(str);
  assertEquals(actual, "en");
});

Deno.test("cant parseLanguage and throws", async () => {
  const str = "garbage";

  assertThrows(
    (): void => {
      parseLanguage(str);
    },
    Error,
    "language not found"
  );
});
