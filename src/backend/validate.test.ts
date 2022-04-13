import { validate } from "./validate.ts";
import { assertThrows } from "../../deps.ts";

Deno.test({
  name: "validate url",
  fn: () => {
    assertThrows(
      (): void => {
        validate("bullshit" as unknown as URL);
      },
      Error,
      "undefined is not a valid tripadvisor url"
    );
  },
});
