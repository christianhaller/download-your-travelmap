export class SubmitButton {
  private el: HTMLElement;
  private submitIcon: HTMLElement;
  private hiddenClassName = "hidden";
  private spinnerIcon: HTMLElement;

  public init(parent: HTMLElement) {
    this.el = parent.querySelector("button");
    this.el.classList.remove("cursor-not-allowed");
    this.submitIcon = this.el.querySelector(".js-submit-icon");
    this.spinnerIcon = this.el.querySelector(".js-spinner-icon");
    return this;
  }
  public loadingStart() {
    this.submitIcon.classList.add(this.hiddenClassName);
    this.spinnerIcon.classList.remove(this.hiddenClassName);
  }
  public loadingStop() {
    this.submitIcon.classList.remove(this.hiddenClassName);
    this.spinnerIcon.classList.add(this.hiddenClassName);
  }
}
