import { parseProfile } from "./parseProfile.ts";
import { parseMap, EnhancedPin } from "./parseMap.ts";
import { request } from "../request.ts";

const getMap = async (url: URL): Promise<EnhancedPin[]> => {
  const res = await request(url);

  try {
    return parseMap(res);
  } catch (e) {
    url.pathname = parseProfile(res);
    const mapResponse = await request(url);
    return parseMap(mapResponse);
  }
};

export { getMap };
