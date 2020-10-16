import { LastUsers } from "./lastUsers.ts";
import { Timestamp } from "./timeStamp30DaysAgo.ts";

// @ts-ignore
import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";

// @ts-ignore
import { Spy, spy, stub } from "https://deno.land/x/mock/mod.ts";

Deno.test({
  name: "lists users",
  fn: async () => {
    const t: Timestamp = new Timestamp();
    const s = stub(t, "getT", () => 1502255549068);

    const Items = [
      {
        cities: 582,
        date: 1602073736895,
        countries: 83,
        userId: "theplanetd",
      },
      {
        cities: 585,
        date: 1602215549067,
        countries: 78,
        userId: "Andres74",
      },
      {
        cities: 585,
        date: 1502255549067,
        countries: 78,
        userId: "ich",
      },
    ];
    const createClient: Spy<void> = spy(() => {
      return {
        scan: () => {
          return {
            Items,
          };
        },
      };
    });
    const res = await new LastUsers(t).list();
    assertEquals(res, [
      {
        cities: 582,
        date: 1602073736895,
        countries: 83,
        userId: "theplanetd",
      },
      {
        cities: 585,
        date: 1602215549067,
        countries: 78,
        userId: "Andres74",
      },
    ]);
    s.restore();
  },
});

Deno.test({
  name: "throws exception",
  fn: async () => {
    const createClient = () => {
      return {
        scan: () => {
          throw new Error("db problems");
        },
      };
    };

    assertThrowsAsync(
      async () => {
        await new LastUsers(new Timestamp()).list();
      },
      Error,
      "db problems",
    );
  },
});

Deno.test({
  name: "put",
  fn: async () => {
    const putItem = spy();
    const createClient: Spy<void> = spy(() => {
      return {
        putItem,
      };
    });
    const res = await new LastUsers(new Timestamp()).put("christian", 1, 1);
    const args = putItem.calls[0].args;
    delete args[0].Item.date;

    assertEquals(args, [
      {
        Item: {
          cities: 1,
          countries: 1,
          userId: "christian",
        },
        TableName: "download-your-travelmap-development",
      },
    ]);
  },
});

Deno.test({
  name: "put throws exception",
  fn: async () => {
    const createClient = () => {
      return {
        putItem: () => {
          throw new Error("db problems");
        },
      };
    };

    assertThrowsAsync(
      async () => {
        await new LastUsers(new Timestamp()).put("test", 1, 1);
      },
      Error,
      "db problems",
    );
  },
});

Deno.test({
  name: "stats",
  fn: () => {
    const createClient: Spy<void> = spy();

    const res = new LastUsers(new Timestamp()).stats([
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
    ]);

    assertEquals(res, {
      cities: 3,
      countries: 2,
    });
  },
});
