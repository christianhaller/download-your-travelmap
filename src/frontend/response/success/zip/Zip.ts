import { downloadZip } from "client-zip";
import { kml } from "./kml";
import { csv } from "./csv";
import type { Response } from "../../../../backend/interace";

export class Zip {
  async create(
    data: Response,
    flags: string | undefined,
    png: Blob
  ): Promise<Blob> {
    const { username } = data;

    const files = [
      ["kml", kml(data)],
      ["csv", csv(data.places)],
      [
        "txt",
        `${
          flags || ""
        } wanna say thanks? https://www.paypal.com/paypalme/christianhaller/2`,
      ],
      ["png", png],
    ].map(([type, input]) => {
      return {
        name: `${username}.${type}`,
        input,
      };
    });
    return downloadZip(files).blob();
  }
}
