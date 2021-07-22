import { log } from "../../deps.ts";

const request = async (url: URL): Promise<string> => {
  const { href } = url;
  log.debug(`fetch url ${href}`);
  const res = await fetch(href, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36",
    },
  });
  log.debug(res);
  if (!res.ok) {
    throw new Error(`url ${href} is not ok`);
  }
  return res.text();
};
export { request };
