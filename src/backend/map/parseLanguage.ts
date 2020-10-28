const parseLanguage = (str: string) => {
  const re = new RegExp(
    `(?<=<html xmlns:fb="http://www.facebook.com/2008/fbml" lang=")(.*?)(?=")`,
  );

  const [firstMatched] = str.match(re) || [];

  if (!firstMatched) {
    throw new Error("language not found");
  }

  return firstMatched;
};
export { parseLanguage };
