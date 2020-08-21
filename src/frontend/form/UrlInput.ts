export class UrlInput {
  private el: HTMLInputElement;

  public init(parent: HTMLElement) {
    this.el = parent.querySelector("#url");
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
