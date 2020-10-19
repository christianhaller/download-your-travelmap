import { LastUsers } from "./lastUsers.ts";
import { Timestamp } from "./timeStamp30DaysAgo.ts";

import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";

import { Spy, spy, stub } from "https://deno.land/x/mock/mod.ts";
import { TransformedStat } from "./interace.ts";
import { S3 } from "./s3.ts";

Deno.test({
  name: "lists users",
  fn: async () => {
    const t: Timestamp = new Timestamp();
    stub(t, "getT", () => 1502255549068);
    const s3: S3 = new S3();
    const s3Stub = stub(s3, "getObject", () => expected);

    const expected = {
      theplanetd: {
        cities: 582,
        date: 1602073736895,
        countries: 83,
        url: "http://",
      },
      Andres74: {
        cities: 585,
        date: 1602215549067,
        countries: 78,
        url: "http://",
      },
      ich: {
        cities: 585,
        date: 1502255549067,
        countries: 78,
        url: "http://",
      },
    } as Record<string, TransformedStat>;

    const res = await new LastUsers(t, s3).list();
    assertEquals(res, [
      {
        cities: 582,
        date: 1602073736895,
        countries: 83,
        username: "theplanetd",
        url: "http://",
      },
      {
        cities: 585,
        date: 1602215549067,
        countries: 78,
        username: "Andres74",
        url: "http://",
      },
    ]);
  },
});

Deno.test({
  name: "stats",
  fn: () => {
    const s3: S3 = new S3();
    const res = new LastUsers(new Timestamp(), s3).stats([
      {
        lat: 42.54325,
        lng: 1.73377,
        flags: ["been"],
        city: "Pas de la Casa",
        country: "Andorra",
      },
      {
        lat: 42.50689,
        lng: 1.525626,
        flags: ["been"],
        city: "Andorra la Vella",
        country: "Andorra",
      },
      {
        lat: 42.55383,
        lng: 1.59044,
        flags: ["been"],
        city: "Paris",
        country: "France",
      },
      {
        lat: 42.55383,
        lng: 1.59044,
        flags: ["want"],
        city: "want",
        country: "want",
      },
    ]);

    assertEquals(res, {
      cities: 3,
      countries: 2,
    });
  },
});
