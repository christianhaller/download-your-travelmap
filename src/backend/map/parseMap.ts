// @ts-ignore
import { parseUser } from "./parseUser.ts";
// @ts-ignore
import type { Response, Pin } from "../interace.ts";
// @ts-ignore
import { parseLanguage } from "./parseLanguage.ts";

const parseMap = (str: string): Response => {
  const key = "modules.unimplemented.entity.LightWeightPin";
  const re = new RegExp(`"${key}":([\\s\\S]*?)}}`, "sg");

  const [firstMatched] = str.match(re) || [];

  try {
    const pins: {
      [key]: Pin[];
    } = JSON.parse(`{${firstMatched}}`);

    const places = Object.values(pins[key])
      .map(({ lat, lng, flags, name }) => {
        const [city, state, country = state || "unknown"] = name.split(",");
        return {
          lat,
          lng,
          flags,
          city: city.trim(),
          country: country.trim(),
        };
      })
      .sort(({ country: countryA }, { country: countryB }) => {
        if (countryA > countryB) {
          return 1;
        }

        if (countryA < countryB) {
          return -1;
        }
        return 0;
      });

    const username = parseUser(str);
    const language = parseLanguage(str);

    return {
      language,
      username,
      places,
    };
  } catch (e) {
    throw new Error("can't parse map");
  }
};
export { parseMap };
