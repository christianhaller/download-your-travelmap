interface Pin {
  name: string;
  lat: number;
  flags: string[];
  lng: number;
}

export interface EnhancedPin extends Omit<Pin, "name"> {
  city: string;
  country: string;
}

const parseMap = (str: String): EnhancedPin[] => {
  const key = "modules.unimplemented.entity.LightWeightPin";
  const re = new RegExp(`"${key}":([\\s\\S]*?)}}`, "sg");

  const [firstMatched] = str.match(re) || [];

  try {
    const pins: {
      [key]: Pin[];
    } = JSON.parse(`{${firstMatched}}`);
    return Object.values(pins[key]).map(({ lat, lng, flags, name }) => {
      const [city, state, country = state || "unknown"] = name.split(",");
      return {
        lat,
        lng,
        flags,
        city: city.trim(),
        country: country.trim(),
      };
    });
  } catch (e) {
    throw new Error("can't parse map");
  }
};
export { parseMap };
