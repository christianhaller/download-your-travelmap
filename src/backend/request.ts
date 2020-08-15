// @ts-ignore
import * as log from "https://deno.land/std/log/mod.ts";

const request = async (url: URL): Promise<string> => {
  const { href } = url;
  log.debug(`fetch url ${href}`);
  const res = await fetch(href);
  if (!res.ok) {
    throw new Error(`url ${href} is not ok`);
  }
  return res.text();
};
export { request };
