import * as log from "https://deno.land/std/log/mod.ts";
const parseProfile = (str: string) => {
  const key = "/TravelMap-a_uid";
  const re = new RegExp(`${key}([^"]*)`);

  const [firstMatched] = str.match(re) || [];
  if (!firstMatched) {
    throw new Error("map link not found");
  }
  log.debug(`map url: ${firstMatched}`);
  return firstMatched;
};
export { parseProfile };
