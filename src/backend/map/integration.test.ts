import { getMap } from "./index.ts";

import { assertArrayIncludes, assertStrictEquals } from "../../../deps.ts";

const hotWaterBeachNewZeeland = {
  lat: -36.88819,
  lng: 175.8202,
  flags: ["been"],
  city: "Hot Water Beach",
  country: "New Zealand",
};

const newYorkCityUSA = {
  lat: 40.713238,
  lng: -74.00584,
  flags: ["been"],
  city: "New York City",
  country: "USA",
};

Deno.test("getMap from profile page", async () => {
  const url = new URL("https://www.tripadvisor.com/Profile/christianhaller");
  const { places, username } = await getMap(url);
  assertArrayIncludes(places, [hotWaterBeachNewZeeland, newYorkCityUSA]);
  assertStrictEquals(username, "christianhaller");
});

Deno.test("try to fix bug", async () => {
  const url = new URL(
    "https://www.tripadvisor.com/TravelMap-a_uid.0FFD2FF98FA609FE296CBC72838317A4"
  );
  const { places, username } = await getMap(url);
  assertArrayIncludes(places, [
    {
      city: "Shibam",
      country: "Yemen",
      flags: ["been"],
      lat: 15.87026,
      lng: 48.65615,
    },
  ]);
  assertStrictEquals(username, "piotrk306");
});

Deno.test("getMap theplanetd", async () => {
  const url = new URL("https://www.tripadvisor.com/Profile/theplanetd");
  const { username } = await getMap(url);

  assertStrictEquals(username, "theplanetd");
});

Deno.test("getMap from map page", async () => {
  const url = new URL(
    "https://www.tripadvisor.com/TravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693"
  );

  const { places, username } = await getMap(url);
  assertArrayIncludes(places, [hotWaterBeachNewZeeland]);
  assertStrictEquals(username, "christianhaller");
});
