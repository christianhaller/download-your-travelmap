// @ts-ignore
import { validHostnames } from "./validHostnames.ts";
// @ts-ignore
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: "is array",
  fn: () => {
    assertEquals(Array.isArray(validHostnames), true);
  },
});