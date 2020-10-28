const parseProfile = (str: string) => {
  const key = "/TravelMap-a_uid";
  const re = new RegExp(`${key}([^"]*)`);

  const [firstMatched] = str.match(re) || [];
  if (!firstMatched) {
    throw new Error("map link not found");
  }
  return firstMatched;
};
export { parseProfile };
