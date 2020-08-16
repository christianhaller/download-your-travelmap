import { parseMap } from "./parseMap.ts";
import {
  readJson,
  //  writeJsonSync,
} from "https://deno.land/std/fs/mod.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("parseMap", async () => {
  const str = await Deno.readTextFile("./fixtures/map.html");
  const { places } = parseMap(str);

  // update snapshot
  //writeJsonSync("./fixtures/expectedMap.json", places);
  const expected = await readJson("./fixtures/expectedMap.json");
  assertEquals(places, expected);
});

Deno.test("parseMap with exception", async () => {
  const str = await Deno.readTextFile("./fixtures/homepage.html");
  assertThrows(
    (): void => {
      parseMap(str);
    },
    Error,
    "can't parse map"
  );
});
