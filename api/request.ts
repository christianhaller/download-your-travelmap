const request = async (url: URL): Promise<string> => {
  const { href } = url;
  console.log(`fetch url ${href}`);
  const res = await fetch(href);
  if (!res.ok) {
    throw Error(`url ${href} is not ok`);
  }
  return res.text();
};
export { request };
