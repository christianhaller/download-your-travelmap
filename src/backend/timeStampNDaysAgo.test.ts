import { Timestamp } from "./timeStampNDaysAgo.ts";
import { assertEquals } from "../../deps.ts";

Deno.test({
  name: "timestamp",
  fn: async () => {
    const sut = new Timestamp();
    const timestamp30DaysAgo = sut.getTimestamp30DaysAgo();
    const current = sut.getTimestamp();
    assertEquals(current - timestamp30DaysAgo, 2595600000);
  },
});
