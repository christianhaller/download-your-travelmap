import { parseUser } from "./parseUser.ts";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("parseUser", async () => {
  const str = await Deno.readTextFile("./fixtures/map.html");
  const actual = parseUser(str);
  assertEquals(actual, "agaraizar");
});

Deno.test("cant parse user and throws", async () => {
  const str = "garbage";

  assertThrows(
    (): void => {
      parseUser(str);
    },
    Error,
    "user name not found"
  );
});
