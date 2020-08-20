export class Failure {
  private el: HTMLElement | undefined;
  private doc: HTMLDocument;

  constructor(doc: HTMLDocument) {
    this.doc = doc;
  }

  init() {
    this.el = this.doc.querySelector(".failure");
    return this;
  }

  async show(msg: string) {
    this.el.querySelector("p").innerText = msg;
    this.el?.classList.remove("hidden");
  }
  hide() {
    this.el?.classList.add("hidden");
  }
}
