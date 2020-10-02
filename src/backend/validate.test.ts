import { validate } from "./validate.ts";
// @ts-ignore
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: "validate url",
  fn: async () => {
    assertThrows(
      (): void => {
        validate(("bullshit" as unknown) as URL);
      },
      Error,
      "undefined is not a valid tripadvisor url"
    );
  },
});
