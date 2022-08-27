import { Success } from "./Success";

jest.mock("./DownloadButton", () => {
  return {
    DownloadButton: jest.fn(() => {
      return {
        init: () => {},
      };
    }),
  };
});

jest.mock("client-zip", () => ({
  downloadZip: jest.fn(() => {
    return {
      blob: () => {
        return Promise.resolve(new Blob());
      },
    };
  }),
}));

jest.mock("./Table", () => {
  return {
    Table: jest.fn(() => {
      return {
        init: () => {},
      };
    }),
  };
});

jest.mock("./Flags", () => {
  return {
    Flags: jest.fn(() => {
      return {
        init: () => {
          return {
            getString: () => {},
          };
        },
      };
    }),
  };
});

jest.mock("./Chart", () => {
  return {
    Chart: jest.fn(() => {
      return {
        init: () => {
          return {
            getImage: () => {},
          };
        },
      };
    }),
  };
});

describe("Success", () => {
  document.body.innerHTML = '<div class="success"></div>';
  const sut = new Success(document);
  sut.init();
  test("init", () => {
    const el = document.querySelector(".success");
    document.dispatchEvent(new Event("success.hide"));
    expect(el.classList.contains("hidden")).toBe(true);
  });

  test("show", () => {
    // @ts-ignore
    const spy = jest.spyOn(sut, "show");

    document.dispatchEvent(
      <Event>new CustomEvent("success.show", {
        detail: {
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
        },
      })
    );
    expect(spy).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": [
          [
            {
              "language": "en",
              "places": [
                {
                  "city": "Kyiv(Kiev)",
                  "country": "Ukraine",
                  "flags": [
                    "been",
                  ],
                  "lat": 50.444885,
                  "lng": 30.536667,
                },
                {
                  "city": "Colonia del Sacramento",
                  "country": "Uruguay",
                  "flags": [
                    "been",
                  ],
                  "lat": -34.45451,
                  "lng": -57.83755,
                },
              ],
              "username": "christianhaller",
            },
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": Promise {},
          },
        ],
      }
    `);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("show", async () => {
    await sut.show({
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
