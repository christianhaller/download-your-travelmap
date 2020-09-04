import { Zip } from "./zip/Zip";
import { Flags } from "./Flags";
import { Chart } from "./Chart";
import type { Response } from "../../../backend/interace";
import { DownloadButton } from "./DownloadButton";
import { Table } from "./Table";

export class Success {
  private el: HTMLElement | undefined;
  private doc: HTMLDocument;
  private hiddenClassName = "hidden";

  constructor(doc: HTMLDocument) {
    this.doc = doc;
  }

  init() {
    this.el = this.doc.querySelector(".success");
    this.doc.addEventListener("success.show", (async (event: CustomEvent) => {
      const { detail }: { detail: Response } = event;
      await this.show(detail);
    }) as EventListener);

    this.doc.addEventListener("success.hide", () => {
      this.hide();
    });
  }

  private async show(data: Response): Promise<void> {
    this.el?.classList.remove(this.hiddenClassName);
    const chart = await new Chart().init(this.el, data.places);
    const flags = new Flags().init(this.el, data);
    const png = await chart.getImage();
    const zip = await new Zip().create(data, flags.getString(), png);
    new DownloadButton().init(this.el, zip, data.username);
    new Table(flags).init(this.el, data);
  }

  private hide(): void {
    this.el?.classList.add(this.hiddenClassName);
  }
}
