import { getMap } from "./index.ts";

import {
  assertArrayContains,
  assertStrictEquals,
} from "https://deno.land/std/testing/asserts.ts";

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
  assertArrayContains(places, [hotWaterBeachNewZeeland, newYorkCityUSA]);
  assertStrictEquals(username, "christianhaller");
});

Deno.test("getMap from map page", async () => {
  const url = new URL(
    "https://www.tripadvisor.com/TravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693"
  );

  const { places, username } = await getMap(url);
  assertArrayContains(places, [hotWaterBeachNewZeeland]);
  assertStrictEquals(username, "christianhaller");
});