import { Table } from "./Table";
import { Flags } from "./Flags";

describe("Table", () => {
  const flags = new Flags();
  const sut = new Table(flags);

  document.body.innerHTML = "<table><tbody></tbody></table>";

  test("init", () => {
    sut.init(document.body, {
      language: "en",
      username: "christianhaller",
      places: [
        {
          lat: 50.444885,
          lng: 30.536667,
          flags: ["been", "want", "fave"],
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
    expect(document.querySelector("table").innerHTML).toMatchSnapshot();
  });
});
