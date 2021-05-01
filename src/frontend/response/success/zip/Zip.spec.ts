import { Zip } from "./Zip";
import type { Response } from "../../../../backend/interace";

jest.mock("client-zip", () => ({
  downloadZip: jest.fn(() => {
    return {
      blob: () => {
        return Promise.resolve(new Blob());
      },
    };
  }),
}));

describe("Zip", () => {
  test("create", async () => {
    const res = new Zip().create(
      {
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
      } as Response,
      "🇲🇰",
      new Blob([])
    );

    await expect(res).resolves.toMatchSnapshot();
  });
});
