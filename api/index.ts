// @ts-ignore
import { ServerRequest } from "https://deno.land/std/http/server.ts";
// @ts-ignore
import { getUrl } from "../src/backend/url.ts";
// @ts-ignore
import { validate } from "../src/backend/validate.ts";
// @ts-ignore
import { getMap } from "../src/backend/map/index.ts";
// @ts-ignore
import { failure, success } from "../src/backend/response.ts";
// @ts-ignore
import { LastUsers } from "../src/backend/lastUsers.ts";
// @ts-ignore
import { createClient } from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";

export default async (req: ServerRequest) => {
  try {
    const url = getUrl(req);
    validate(url);
    const map = await getMap(url);
    const l = new LastUsers(createClient);
    const { countries, cities } = l.stats(map.places);
    await l.put(map.username, countries, cities);
    success(req, map);
  } catch (error) {
    failure(req, error.message);
  }
};
