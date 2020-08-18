import json2csv from "json2csv/dist/json2csv.umd";
import type { EnhancedPin } from "../../backend/interace";

export function csv(data: EnhancedPin[]) {
  const fields = ["lat", "lon", "country", "city", "been"];
  return json2csv.parse(
    data.map(({ flags, lng, lat, country, city }) => {
      return {
        been: flags.join(","),
        lon: lng,
        lat,
        country,
        city,
      };
    }),
    {
      delimiter: ";",
      quote: "",
      fields,
    }
  );
}
