import { kml } from "./kml";

test.only("kml", () => {
  const res = kml({
    language: "en",
    username: "christianhaller",
    places: [
      {
        lat: 50.444885,
        lng: 30.536667,
        flags: ["been"],
        city: "Kyiv(Kiev)",
        country: "Ukraine",
      },
      {
        lat: -34.45451,
        lng: -57.83755,
        flags: ["been"],
        city: "Colonia del Sacramento",
        country: "Uruguay",
      },
    ],
  });
  expect(res).toMatchSnapshot();
});
