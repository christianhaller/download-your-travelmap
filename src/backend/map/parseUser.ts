const parseUser = (str: string) => {
  const re = new RegExp(`(?<=<div class="memberTitle">)(.*?)(?=</div>)`);
  const [firstMatched] = str.match(re) || [];

  if (!firstMatched) {
    throw new Error("user name not found");
  }

  return firstMatched;
};
export { parseUser };
