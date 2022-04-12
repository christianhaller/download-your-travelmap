import { assertEquals } from "../../deps.ts";
import { failure, success } from "./response.ts";

Deno.test({
  name: "sends success response",
  fn: async () => {
    const res = success({
      foo: "bar",
    });
    assertEquals(await res.text(), '{"foo":"bar"}');
  },
});

Deno.test({
  name: "sends failure response",
  fn: async () => {
    const sut = failure("fuck");
    assertEquals(await sut.text(), "fuck");
  },
});
