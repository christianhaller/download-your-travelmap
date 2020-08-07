import tokml from "tokml";
import GeoJSON from "geojson";

export function kml(data: any) {
  var json = GeoJSON.parse(data.places, {
    Point: ["lat", "lng"],
    include: ["name"],
  });
  return tokml(json, {
    name: "name",
    documentName: data.username + "'s travelmap",
    documentDescription: "I have been to " + data.places.length + " cities",
  });
}
