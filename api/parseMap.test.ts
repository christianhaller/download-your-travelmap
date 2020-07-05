import { parseMap } from "./parseMap.ts";
import { readFileStr, readJson } from "https://deno.land/std/fs/mod.ts";
import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("parseMap", async () => {
  const str = await readFileStr("./fixtures/map.html", { encoding: "utf8" });
  const expected = await readJson("./fixtures/expectedMap.json");
  const actual = parseMap(str);
  assertEquals(actual, expected);
});
