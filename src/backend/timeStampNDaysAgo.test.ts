import { Timestamp } from "./timeStampNDaysAgo.ts";
import { assertEquals } from "../../deps.ts";

Deno.test({
  name: "timestamp",
  fn: async () => {
    const res = new Timestamp().getT();
    assertEquals(Number.isInteger(res), true);
  },
});
