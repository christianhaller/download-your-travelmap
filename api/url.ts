import type { ServerRequest } from "https://deno.land/std@0.58.0/http/server.ts";

const getUrl = (req: ServerRequest): URL => {
  const [, query] = req.url.split("?");

  const url = new URLSearchParams(query).get("url");
  if (!url) {
    throw Error("no url set");
  }

  return new URL(url);
};

export { getUrl };
