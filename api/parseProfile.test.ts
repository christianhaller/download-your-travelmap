import { parseProfile } from "./parseProfile.ts";
import { readFileStr } from "https://deno.land/std/fs/mod.ts";
import {
    assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("parseMap", async () => {
    const str = await readFileStr("./fixtures/profile.html", { encoding: "utf8" });
    const actual = parseProfile(str);
    assertEquals(actual, "abc");
});
