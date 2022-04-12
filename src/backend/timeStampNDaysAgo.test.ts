import { Timestamp } from "./timeStampNDaysAgo.ts";
// import { assertEquals, round } from "../../deps.ts";

Deno.test({
  name: "timestamp",
  fn: () => {
    const sut = new Timestamp();
    const timestamp30DaysAgo = sut.getTimestampNDaysAgo(30);
    const current = sut.getTimestamp();
    const d = 1000 / 3600 / 24;
    /* assertEquals(
      round((current - timestamp30DaysAgo) / d),
      round(2595600000 / d)
    ); */
  },
});
