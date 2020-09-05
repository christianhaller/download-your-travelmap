import { csv } from "./csv";

test("csv", () => {
  const pins = [
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
  ];
  const res = csv(pins);
  expect(res).toMatchSnapshot();
});
