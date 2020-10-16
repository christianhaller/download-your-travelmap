// @ts-ignore
import type { ServerRequest } from "https://deno.land/std/http/server.ts";

const getHeaders = (ttl = "3600"): Headers => {
  const headers = new Headers();
  headers.append("cache-control", `s-maxage=${ttl}, maxage=${ttl}`);
  headers.append("content-type", "application/json");
  return headers;
};

const success = (req: ServerRequest, b: Object, ttl = "3600"): void => {
  const headers = getHeaders(ttl);
  const body = JSON.stringify(b);

  req.respond({ body, headers });
};

const failure = (req: ServerRequest, body: string): void => {
  const headers = getHeaders();

  req.respond({
    status: 400,
    headers,
    body,
  });
};
export { failure, success };
