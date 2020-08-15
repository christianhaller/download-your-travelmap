// @ts-ignore
import * as log from "https://deno.land/std/log/mod.ts";
const parseUser = (str: string) => {
  const re = new RegExp(`(?<=<div class="memberTitle">)(.*?)(?=</div>)`);

  const [firstMatched] = str.match(re) || [];
  log.info(`user: ${firstMatched}`);
  if (!firstMatched) {
    throw new Error("user name not found");
  }

  return firstMatched;
};
export { parseUser };
