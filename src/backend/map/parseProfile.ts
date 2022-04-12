import { log } from "../../../deps.ts";

const parseProfile = (str: string) => {
  const key = "/TravelMap-a_uid";
  const re = new RegExp(`${key}([^"]*)`);

  const [firstMatched] = str.match(re) || [];
  if (!firstMatched) {
    const key2 = `userId\\\\":\\\\"(.*?)\\\\"`;
    const re = new RegExp(key2);

    let [, id] = str.match(re) || [];

    if (!id) {
      const r = `userId":"(.*?)"`;
      const re = new RegExp(r);

      [, id] = str.match(re) || [];
      if (!id) {
        throw new Error("map link not found");
      }
    }

    return "/TravelMap-a_uid." + id;
  }
  return firstMatched;
};
export { parseProfile };
