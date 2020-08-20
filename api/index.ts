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

export default async (req: ServerRequest) => {
  try {
    const url = getUrl(req);
    validate(url);
    const map = await getMap(url);
    success(req, map);
  } catch (error) {
    failure(req, error.message);
  }
};
