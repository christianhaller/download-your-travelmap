import json2csv from "json2csv/dist/json2csv.umd";

export function csv(data) {
  const fields = ["lat", "lon", "name", "country", "city", "been"];
  return json2csv.parse(
    data.map(({ flags, lng, lat, name, country, city }) => {
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
