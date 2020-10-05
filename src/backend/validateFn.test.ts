// @ts-ignore
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
// @ts-ignore
import { validateFn } from "./validateFn.ts";
// @ts-ignore
import { validHostnames } from "./validHostnames.ts";

Deno.test({
  name: "invalid url",
  fn: async () => {
    try {
      validateFn(new URL(""), []);
    } catch (e) {
      assertEquals(e.message, "Invalid URL.");
    }
  },
});

Deno.test({
  name: "not a ta url",
  fn: async () => {
    try {
      validateFn(new URL("https://christianhaller.com"), validHostnames);
    } catch (e) {
      assertEquals(
        e.message,
        "christianhaller.com is not a valid tripadvisor url",
      );
    }
  },
});

Deno.test({
  name: "ta url",
  fn: async () => {
    validateFn(new URL("https://tripadvisor.de"), validHostnames);
  },
});

Deno.test({
  name: "tripadvisor.de",
  fn: async () => {
    validateFn(new URL("https://www.tripadvisor.de"), validHostnames);
  },
});
