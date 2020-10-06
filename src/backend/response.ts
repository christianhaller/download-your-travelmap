// @ts-ignore
import type { ServerRequest } from "https://deno.land/std/http/server.ts";

const getHeaders = (): Headers => {
  const headers = new Headers();
  headers.append("cache-control", "s-maxage=3600, maxage=3600");
  headers.append("content-type", "application/json");
  return headers;
};

const success = (req: ServerRequest, b: Object): void => {
  const headers = getHeaders();
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
