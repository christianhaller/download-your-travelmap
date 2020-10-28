import { validHostnames } from "./validHostnames.ts";
import { assertEquals } from "../../deps.ts";

Deno.test({
  name: "is array",
  fn: () => {
    assertEquals(Array.isArray(validHostnames), true);
  },
});
