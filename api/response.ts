import type { ServerRequest } from "https://deno.land/std@0.58.0/http/server.ts";

const getHeaders = (): Headers => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  return headers;
};

const success = (req: ServerRequest, b: Object) => {
  const headers = getHeaders();
  const body = JSON.stringify(b);
  // todo: correct length with buffer byteLength
  headers.append("Content-Length", body.length.toString());
  headers.append("Cache-Control", "s-maxage=60, maxage=60");

  req.respond({ body, headers });
};

const failure = (req: ServerRequest, body: string) => {
  const headers = getHeaders();

  req.respond({
    status: 400,
    headers,
    body,
  });
};
export {
  success,
  failure,
};
