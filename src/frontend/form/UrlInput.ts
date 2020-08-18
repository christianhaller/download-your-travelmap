export class UrlInput {
  private el: HTMLInputElement;

  public init(parent: HTMLElement) {
    this.el = parent.querySelector("#url");
    return this;
  }

  public setFocus(): void {
    this.el.focus();
  }

  public getValue(): string {
    return this.el.value;
  }
}
