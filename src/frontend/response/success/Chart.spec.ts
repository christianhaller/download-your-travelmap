import { Chart } from "./Chart.ts";

jest.mock("loadjs", () => {
  return jest.fn(() => {});
});

describe("Chart", () => {
  window.google = {
    charts: {
      load: jest.fn(),
      setOnLoadCallback: jest.fn(),
    },
  };

  test("init", () => {
    new Chart().init(document, {
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
  });
});
