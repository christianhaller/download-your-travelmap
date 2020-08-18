import { Zip } from "../../Zip/Zip";
// import { downloadButton } from "./DownloadButton";
import { Flags } from "./Flags";
import { Chart } from "./Chart";
import type { Response } from "../../../backend/interace";
import { DownloadButton } from "./DownloadButton";

export class Success {
  private data: Response;
  private selector: string;
  private el: HTMLElement | undefined;
  private doc: HTMLDocument;
  private chart: Chart;
  private flags: Flags;
  // private downloadButton;

  constructor(selector: string, doc: HTMLDocument) {
    this.doc = doc;
    this.selector = selector;
  }

  init(data: Response) {
    this.el = this.doc.querySelector(this.selector);
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
