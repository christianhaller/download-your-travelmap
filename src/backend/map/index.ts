import { parseProfile } from "./parseProfile.ts";
import { parseMap } from "./parseMap.ts";
import { request } from "../request.ts";
import type { Response } from "../interace.ts";
import { log } from "../../../deps.ts";

const getMap = async (url: URL): Promise<Response> => {
  const res = await request(url);
  log.debug("url %s", url.href);

  try {
    return parseMap(res);
  } catch (e) {
    url.pathname = parseProfile(res);
    const mapResponse = await request(url);
    // Deno.writeTextFile("markkxldor.html", mapResponse);
    log.info(mapResponse);
    return parseMap(mapResponse);
  }
};

export { getMap };
