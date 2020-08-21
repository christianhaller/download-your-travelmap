import bytes from "bytes";

export class DownloadButton {
  private el: HTMLAnchorElement;

  init(parent: HTMLElement, blob: Blob, username: string) {
    this.el = parent.querySelector("#download");

    this.el.href = window.URL.createObjectURL(blob);
    this.el.download = `${username}.zip`;

    this.el.classList.remove("cursor-not-allowed");
    this.el.querySelector("span").innerText = `Download (${bytes(blob.size)})`;
  }
}
