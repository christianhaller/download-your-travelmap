import { validateFn } from "./validateFn.ts";

import { validHostnames } from "./validHostnames.ts";
import { assertEquals } from "../../deps.ts";

Deno.test({
  name: "invalid url",
  fn: () => {
    try {
      validateFn(new URL(""), []);
    } catch (e) {
      assertEquals(e.message, `Invalid URL: ''`);
    }
  },
});

Deno.test({
  name: "not a ta url",
  fn: () => {
    try {
      validateFn(new URL("https://christianhaller.com"), validHostnames);
    } catch (e) {
      assertEquals(
        e.message,
        "christianhaller.com is not a valid tripadvisor url"
      );
    }
  },
});

Deno.test({
  name: "ta url",
  fn: () => {
    validateFn(new URL("https://tripadvisor.de"), validHostnames);
  },
});

Deno.test({
  name: "tripadvisor.de",
  fn: () => {
    validateFn(new URL("https://www.tripadvisor.de"), validHostnames);
  },
});

Deno.test({
  name: "profile",
  fn: () => {
    validateFn(
      new URL("https://www.tripadvisor.com/members/GermanR"),
      validHostnames
    );
  },
});
