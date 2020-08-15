// @ts-ignore
import type { ServerRequest } from "https://deno.land/std@0.62.0/http/server.ts";

const getUrl = (req: ServerRequest): URL => {
  const [, query] = req.url.split("?");

  const url = new URLSearchParams(query).get("url");
  if (!url) {
    throw new Error("no url set");
  }

  return new URL(url);
};

export { getUrl };
