// @ts-ignore
import * as log from "https://deno.land/std/log/mod.ts";
// @ts-ignore
import { parseProfile } from "./parseProfile.ts";
// @ts-ignore
import { parseMap } from "./parseMap.ts";
// @ts-ignore
import { request } from "../request.ts";
// @ts-ignore
import type { Response } from "../interace.ts";

const getMap = async (url: URL): Promise<Response> => {
  const res = await request(url);
  log.debug("url %s", url.href);

  try {
    return parseMap(res);
  } catch (e) {
    url.pathname = parseProfile(res);
    const mapResponse = await request(url);
    return parseMap(mapResponse);
  }
};

export { getMap };
