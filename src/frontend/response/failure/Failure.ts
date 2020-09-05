export class Failure {
  private el: HTMLElement | undefined;
  private doc: HTMLDocument;
  private hiddenClassName = "hidden";

  constructor(doc: HTMLDocument) {
    this.doc = doc;
  }

  init() {
    this.el = this.doc.querySelector(".failure");
    return this;
  }

  public show(msg: string): void {
    this.el.querySelector("p").innerHTML = msg;
    this.el.classList.remove(this.hiddenClassName);
  }
  public hide(): void {
    this.el.classList.add(this.hiddenClassName);
  }
}
