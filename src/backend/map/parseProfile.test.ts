import { parseProfile } from "./parseProfile.ts";
import { assertEquals, assertThrows } from "../../../deps.ts";

Deno.test("parseProfile1", async () => {
  const str = await Deno.readTextFile("./fixtures/profile.html");
  const actual = parseProfile(str);
  assertEquals(actual, "/TravelMap-a_uid.41651DA6870F6D8783C64EEFC0D08986");
});

Deno.test("parseProfile2", async () => {
  const str = await Deno.readTextFile("./fixtures/profile2.html");
  const actual = parseProfile(str);
  assertEquals(actual, "/TravelMap-a_uid.0C6BE52F6C7829963646D499A74E256F");
});

Deno.test("parse planetd", async () => {
  const str = await Deno.readTextFile("./fixtures/planetd.html");
  const actual = parseProfile(str);
  assertEquals(actual, "/TravelMap-a_uid.4EC6C958F8E7F13066AAC8095EFA9D86");
});

Deno.test("parse m", async () => {
  const str = await Deno.readTextFile("./fixtures/m.html");
  const actual = parseProfile(str);
  assertEquals(actual, "/TravelMap-a_uid.0C6BE52F6C7829963646D499A74E256F");
});

Deno.test("parseProfile with exception", async () => {
  const str = await Deno.readTextFile("./fixtures/homepage.html");

  assertThrows(
    (): void => {
      parseProfile(str);
    },
    Error,
    "map link not found"
  );
});
