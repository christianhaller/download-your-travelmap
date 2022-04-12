const getUrl = (request: Deno.RequestEvent): URL => {
  const [, query] = request.request.url.split("?");

  const url = new URLSearchParams(query).get("url");
  if (!url) {
    throw new Error("no url set");
  }

  return new URL(url);
};

export { getUrl };
