import { LastUsers } from "./lastUsers.ts";
import { Timestamp } from "./timeStampNDaysAgo.ts";

import { assertEquals, AWSSignerV4, stub } from "../../deps.ts";

import { TransformedStat } from "./interace.ts";
import { S3 } from "./s3.ts";

Deno.test({
  name: "list users",
  fn: async () => {
    const t: Timestamp = new Timestamp();
    stub(t, "getTimestampNDaysAgo", () => 1502255549068);
    const s3: S3 = new S3({} as AWSSignerV4, "local");
    const getObject = stub(s3, "getObject", () => expected);

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
        date: 1502255549069,
        countries: 78,
        url: "http://",
      },
      du: {
        cities: 585,
        date: 1502255549069,
        countries: 203,
        url: "http://",
      },
    } as Record<string, TransformedStat>;

    const res = await new LastUsers(t, s3).list(30);
    assertEquals(res, [
      {
        cities: 585,
        date: 1502255549069,
        countries: 203,
        username: "du",
        url: "http://",
      },
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
      {
        cities: 585,
        date: 1502255549069,
        countries: 78,
        username: "ich",
        url: "http://",
      },
    ]);
    getObject.restore();
  },
});

Deno.test({
  name: "saves user",
  fn: async () => {
    const t: Timestamp = new Timestamp();
    stub(t, "getTimestamp", () => 1502255549068);
    const s3: S3 = new S3({} as AWSSignerV4, "local");
    const put = stub(s3, "putObject");
    stub(s3, "getObject", () => {
      return {};
    });

    await new LastUsers(t, s3).save({
      cities: 582,
      countries: 83,
      username: "theplanetd",
      url: "http://",
    });
    assertEquals(put.calls[0].args[0], {
      theplanetd: {
        cities: 582,
        countries: 83,
        date: 1502255549068,
        url: "http://",
      },
    });
    put.restore();
  },
});

Deno.test({
  name: "stats",
  fn: () => {
    const s3: S3 = new S3({} as AWSSignerV4, "local");
    const t: Timestamp = new Timestamp();
    stub(t, "getT", () => 1502255549068);
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
        city: "LA",
        country: "USA",
      },
      {
        lat: 42.55383,
        lng: 1.59044,
        flags: ["been"],
        city: "NYC",
        country: "USA",
      },
      {
        lat: 42.55383,
        lng: 1.59044,
        flags: ["been"],
        city: "SF",
        country: "USA",
      },
      {
        lat: 42.55383,
        lng: 1.59044,
        flags: ["been"],
        city: "Lyon",
        country: "France",
      },
      {
        lat: 42.55383,
        lng: 1.59044,
        flags: ["been"],
        city: "Brussel",
        country: "Belge",
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
      cities: 7,
      countries: 4,
    });
  },
});
