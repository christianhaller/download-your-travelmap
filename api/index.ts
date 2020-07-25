import { ServerRequest } from "https://deno.land/std@0.62.0/http/server.ts";
import { getUrl } from "../src/url.ts";
import { validate } from "../src/validate.ts";
import { getMap } from "../src/map/index.ts";
import { success, failure } from "../src/response.ts";

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
