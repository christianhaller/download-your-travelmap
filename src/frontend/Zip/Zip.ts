import JSZip from "jszip/dist/jszip";
import { kml } from "./kml";
import { csv } from "./csv";
import type { Response } from "../../backend/interace";

export class Zip {
  async create(
    data: Response,
    flags: string | undefined,
    png: Blob
  ): Promise<Blob> {
    const { username } = data;
    const zip = new JSZip();

    zip.file(`${username}.csv`, csv(data.places));
    zip.file(`${username}.kml`, kml(data));
    zip.file(`${username}.png`, png);
    if (flags) {
      zip.file(`${username}.txt`, flags);
    }
    return zip.generateAsync({ type: "blob" });
  }
}
