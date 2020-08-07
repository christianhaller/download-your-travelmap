import { ServerRequest } from "https://deno.land/std@0.62.0/http/server.ts";
import { getUrl } from "../src/backend/url.ts";
import { validate } from "../src/backend/validate.ts";
import { getMap } from "../src/backend/map/index.ts";
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
