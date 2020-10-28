// import{ ServerRequest } from "./deps.ts";

const getHeaders = (ttl = "3600"): Headers => {
  const headers = new Headers();
  headers.append("cache-control", `s-maxage=${ttl}, maxage=${ttl}`);
  headers.append("content-type", "application/json");
  return headers;
};

const success = (req: any, b: unknown, ttl = "3600"): void => {
  const headers = getHeaders(ttl);
  const body = JSON.stringify(b);

  req.respond({ body, headers });
};

const failure = (req: any, body: string): void => {
  const headers = getHeaders();

  req.respond({
    status: 400,
    headers,
    body,
  });
};
export { failure, success };
