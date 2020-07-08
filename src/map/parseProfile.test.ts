import { parseProfile } from "./parseProfile.ts";
import { readFileStr } from "https://deno.land/std/fs/mod.ts";
import {
  assertThrows,
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("parseProfile", async () => {
  const str = await readFileStr(
    "./fixtures/profile.html",
    { encoding: "utf8" },
  );
  const actual = parseProfile(str);
  assertEquals(actual, "/TravelMap-a_uid.41651DA6870F6D8783C64EEFC0D08986");
});

Deno.test("parseProfile with exception", async () => {
  const str = await readFileStr(
    "./fixtures/homepage.html",
    { encoding: "utf8" },
  );

  assertThrows(
    (): void => {
      parseProfile(str);
    },
    Error,
    "map link not found",
  );
});
