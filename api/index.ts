import { ServerRequest } from "https://deno.land/std@0.58.0/http/server.ts";
import { request } from "./request.ts";
import { parseMap } from "./parseMap.ts";
import { validate } from "./validate.ts";
import { success, failure } from "./response.ts";
import { getUrl } from "./url.ts";

export default async (req: ServerRequest) => {
  try {
    const url = getUrl(req);
    validate(url);
    const res = await request(url);
    const body = parseMap(res);
    return success(req, body);
  } catch (error) {
    failure(req, error.message);
  }
};
