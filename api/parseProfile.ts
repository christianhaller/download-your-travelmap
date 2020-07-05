const parseProfile = (str: string) => {
  const key = '/TravelMap-a_uid';
  const re = new RegExp(`${key}([^"]*)`,);

  const [firstMatched] = str.match(re) || [];
  return firstMatched;
};
export { parseProfile };
