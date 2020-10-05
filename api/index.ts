// @ts-ignore
import { ServerRequest } from "https://deno.land/std/http/server.ts";
// @ts-ignore
import { getUrl } from "../src/backend/url.ts";
// @ts-ignore
import { validate } from "../src/backend/validate.ts";
// @ts-ignore
import { getMap } from "../src/backend/map/index.ts";
// @ts-ignore
import { success, failure } from "../src/backend/response.ts";
// @ts-ignore
import "https://deno.land/x/dotenv/load.ts";

// @ts-ignore
import { stats, put } from "../src/backend/lastUsers.ts";

export default async (req: ServerRequest) => {
  try {
    const url = getUrl(req);
    validate(url);
    const map = await getMap(url);
    const { countries, cities } = stats(map.places);
    await put(map.username, countries, cities);
    success(req, map);
  } catch (error) {
    failure(req, error.message);
  }
};
