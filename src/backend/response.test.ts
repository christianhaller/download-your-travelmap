import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { failure, success } from "./response.ts";

import type { ServerRequest } from "https://deno.land/std/http/server.ts";

import { spy } from "https://deno.land/x/mock/mod.ts";

Deno.test({
  name: "sends success response",
  fn: () => {
    const req = ({ respond: () => {} } as unknown) as ServerRequest;
    const respond = spy(req, "respond");
    success(req, {
      foo: "bar",
    });
    assertEquals(respond.calls[0].args[0].body, '{"foo":"bar"}');
  },
});

Deno.test({
  name: "sends failure response",
  fn: () => {
    const req = ({ respond: () => {} } as unknown) as ServerRequest;
    const respond = spy(req, "respond");
    failure(req, "fuck");
    assertEquals(respond.calls[0].args[0].body, "fuck");
  },
});
