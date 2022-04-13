const getHeaders = (ttl = "3600"): Headers => {
  const headers = new Headers();
  headers.append("cache-control", `s-maxage=${ttl}, maxage=${ttl}`);
  headers.append("content-type", "application/json");
  return headers;
};

const success = (b: unknown, ttl = "3600"): Response => {
  const headers = getHeaders(ttl);
  const body = JSON.stringify(b);

  return new Response(body, {
    status: 200,
    headers,
  });
};

const failure = (body: string): Response => {
  const headers = getHeaders();
  return new Response(body, {
    status: 400,
    headers,
  });
};
export { failure, success };
