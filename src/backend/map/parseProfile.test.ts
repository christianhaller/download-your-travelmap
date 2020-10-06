import { parseProfile } from "./parseProfile.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("parseProfile", async () => {
  const str = await Deno.readTextFile("./fixtures/profile.html");
  const actual = parseProfile(str);
  assertEquals(actual, "/TravelMap-a_uid.41651DA6870F6D8783C64EEFC0D08986");
});

Deno.test("parseProfile with exception", async () => {
  const str = await Deno.readTextFile("./fixtures/homepage.html");

  assertThrows(
    (): void => {
      parseProfile(str);
    },
    Error,
    "map link not found",
  );
});
