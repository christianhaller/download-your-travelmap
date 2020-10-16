import * as log from "https://deno.land/std/log/mod.ts";

import { parseProfile } from "./parseProfile.ts";

import { parseMap } from "./parseMap.ts";

import { request } from "../request.ts";

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
