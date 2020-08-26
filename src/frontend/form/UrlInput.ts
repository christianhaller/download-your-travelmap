export class UrlInput {
  private el: HTMLInputElement;

  public init(parent: HTMLElement) {
    this.el = parent.querySelector("#url");
    this.el.addEventListener("paste", () => {
      setTimeout(() => {
        parent.dispatchEvent(new Event("submit"));
      }, 1);
    });
    return this;
  }

  public setFocus(): void {
    this.el.focus();
  }

  public setValue(val: string): void {
    this.el.value = val;
  }

  public getValue(): string {
    return this.el.value;
  }
}
