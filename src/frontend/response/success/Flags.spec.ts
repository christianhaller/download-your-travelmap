import { Flags } from "./Flags";

describe("Flags", () => {
  document.body.innerHTML = '<div class="been"></div>';
  const data = {
    language: "en",
    username: "christianhaller",
    places: [
      {
        lat: 50.444885,
        lng: 30.536667,
        flags: ["been"],
        city: "Kyiv(Kiev)",
        country: "Republic of North Macedonia",
      },
      {
        lat: -34.45451,
        lng: -57.83755,
        flags: ["been"],
        city: "Colonia del Sacramento",
        country: "Uruguay",
      },
      {
        lat: -34.45451,
        lng: -57.83755,
        flags: ["been"],
        city: "another city",
        country: "Uruguay",
      },
      {
        lat: -34.45451,
        lng: -57.83755,
        flags: ["been"],
        city: "another city",
        country: "unknown",
      },
    ],
  };
  const sut = new Flags().init(document.body, data);
  test("getFlag", () => {
    const res = sut.getFlag(data.places[0].country);
    expect(res).toMatchInlineSnapshot(`"🇲🇰 "`);
  });

  test("getString", () => {
    const res = sut.getString();
    expect(res).toMatchInlineSnapshot(`"🇲🇰  🇺🇾   (3)"`);
  });

  test("not englishh language", () => {
    data.language = "de";
    const sut = new Flags().init(document.body, data);
    const res = sut.getString();
    expect(res).toMatchInlineSnapshot(`undefined`);
  });
});
