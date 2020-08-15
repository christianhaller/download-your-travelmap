// @ts-ignore
import * as log from "https://deno.land/std/log/mod.ts";
const parseLanguage = (str: string) => {
  const re = new RegExp(
    `(?<=<html xmlns:fb="http://www.facebook.com/2008/fbml" lang=")(.*?)(?=")`
  );

  const [firstMatched] = str.match(re) || [];
  log.info(`user: ${firstMatched}`);
  if (!firstMatched) {
    throw new Error("language not found");
  }

  return firstMatched;
};
export { parseLanguage };
