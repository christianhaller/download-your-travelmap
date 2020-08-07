import json2csv from "json2csv";

export function csv(data) {
  const fields = ["lat", "lon", "name", "country", "city", "iso", "been"];
  return json2csv.parse(
    data.places.map(({ flags, lng, lat, name, country, city }) => {
      return {
        been: flags.join(","),
        lon: lng,
        lat,
        name,
        country,
        city,
      };
    }),
    {
      fields,
    }
  );
}
