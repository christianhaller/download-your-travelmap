import tokml from "tokml";
import GeoJSON from "geojson";
import type { Response } from "../../backend/interace";

export function kml(data: Response) {
  const json = GeoJSON.parse(data.places, {
    Point: ["lat", "lng"],
  });
  return tokml(json, {
    name: data.username + "'s travelamp map",
    documentName: "tbd",
    documentDescription: "tbd",
  });
}
