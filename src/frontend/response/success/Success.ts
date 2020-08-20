import { Zip } from "../../Zip/Zip";
import { Flags } from "./Flags";
import { Chart } from "./Chart";
import type { Response } from "../../../backend/interace";
import { DownloadButton } from "./DownloadButton";

export class Success {
  private data: Response;
  private el: HTMLElement | undefined;
  private doc: HTMLDocument;

  constructor(doc: HTMLDocument) {
    this.doc = doc;
  }

  init(data: Response) {
    this.el = this.doc.querySelector(".success");
    this.data = data;
    return this;
  }

  async show() {
    this.el?.classList.remove("hidden");
    const chart = await new Chart().init(this.el, this.data.places);

    const flags = new Flags().init(this.el, this.data);
    const png = await chart.getImage();
    const zip = await new Zip().create(this.data, flags.getString(), png);

    new DownloadButton().init(this.el, zip, this.data.username);
  }

  hide() {
    this.el?.classList.add("hidden");
  }
}
