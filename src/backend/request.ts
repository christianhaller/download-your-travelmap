import { log } from "../../deps.ts";
import { userAgent } from "./ua.ts";

const request = async (url: URL): Promise<string> => {
  const { href } = url;
  log.debug(`fetch url ${href}`);
  log.info(userAgent);
  const res = await fetch(href, {
    headers: {
      "User-Agent": userAgent,
    },
  });
  log.debug(res);
  if (!res.ok) {
    throw new Error(`url ${href} is not ok`);
  }
  return res.text();
};
export { request };
