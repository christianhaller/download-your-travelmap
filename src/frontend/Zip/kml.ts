import tokml from "tokml";
import GeoJSON from "geojson";
import type { Response } from "../../backend/interace";

export function kml(data: Response) {

  const json = GeoJSON.parse(data.places.map((place)=>{
    return {
      ...place,
      name: `${place.country}, ${place.city}`
    }
  }), {
    Point: ["lat", "lng"],
    include:['name','flags']
  });  
  return tokml(json, {
    name: 'name',
    documentName: `${data.username}'s travelmap`,
    documentDescription: `I have been to ${data.places.length} places`,
  });
}
