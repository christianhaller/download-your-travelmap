import tokml from "tokml";
import GeoJSON from "geojson";

export function kml(data: any) {
  const json = GeoJSON.parse(data, {
    Point: ["lat", "lng"],
  });
  return tokml(json, {
    name: "name",
    documentName: "44",
    documentDescription: "rrr",
  });
}
