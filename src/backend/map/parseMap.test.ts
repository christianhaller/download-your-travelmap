import { parseMap } from "./parseMap.ts";
import { assertEquals, assertThrows } from "../../../deps.ts";

Deno.test("parseMap", async () => {
  const str = await Deno.readTextFile("./fixtures/map.html");
  const { places } = parseMap(str);

  // update snapshot
  //writeJsonSync("./fixtures/expectedMap.json", places);

  const expected = JSON.parse(
    await Deno.readTextFile("./fixtures/expectedMap.json"),
  );
  assertEquals(places, expected);
});

Deno.test("parseMap with exception", async () => {
  const str = await Deno.readTextFile("./fixtures/homepage.html");
  assertThrows(
    (): void => {
      parseMap(str);
    },
    Error,
    "can't parse map",
  );
});
