import tokml from "tokml";
import GeoJSON from "geojson";
export function kml(data) {
    const json = GeoJSON.parse(data.places, {
        Point: ["lat", "lng"],
    });
    return tokml(json, {
        name: data.username + "'s travelamp map",
        documentName: "tbd",
        documentDescription: "tbd",
    });
}
