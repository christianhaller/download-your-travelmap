import { ServerRequest } from "https://deno.land/std@0.58.0/http/server.ts";
import { getUrl } from "./url.ts";
import { validate } from "./validate.ts";
import { getMap } from "./map/index.ts";
import { success, failure } from "./response.ts";

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
