import { Chart } from "./Chart";

jest.mock("load-js/src/load-js.js", () => jest.fn().mockResolvedValue(true));
let draw;

describe("Chart", () => {
  window.google = {
    visualization: {
      // @ts-ignore
      events: {
        // @ts-ignore
        addListener: (el, name, cb) => {
          cb();
        },
      },
      GeoChart: jest.fn(
        () =>
          ({
            getImageURI: jest.fn() as any,

            draw: draw as any,
          } as any)
      ),
      DataTable: jest.fn(
        () =>
          ({
            addColumn: jest.fn(),
            addRows: jest.fn(),
          } as any)
      ),
    },
    charts: {
      load: jest.fn(),
      setOnLoadCallback: jest.fn((cb) => {
        cb();
      }),
    },
  };

  test("draw", () => {
    draw = jest.fn(() => {
      expect(draw.mock.calls[0]).toMatchSnapshot();
    });
    document.body.innerHTML = "<div id='chart'></div>";

    new Chart().init(document.body, [
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
    ]);
  });

  test("getImage", async () => {
    draw = jest.fn(() => {});
    global.fetch = jest.fn().mockImplementation(() => ({
      blob: jest.fn(() => {
        return "blob";
      }),
    }));
    document.body.innerHTML = "<div id='chart'></div>";

    const res = await new Chart().init(document.body, [
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
        flags: ["want"],
        city: "Colonia del Sacramento",
        country: "Uruguay",
      },
    ]);
    const blob = await res.getImage();
    expect(blob).toMatchInlineSnapshot(`"blob"`);
  });
});
