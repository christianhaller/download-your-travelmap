export class SubmitButton {
  private el: HTMLElement;
  private submitIcon: HTMLElement;
  private spinnerIcon: HTMLElement;

  public init(parent: HTMLElement) {
    console.log("init submit button");

    this.el = parent.querySelector("button");
    this.el.classList.remove("cursor-not-allowed");
    this.submitIcon = this.el.querySelector(".js-submit-icon");
    this.spinnerIcon = this.el.querySelector(".js-spinner-icon");
    return this;
  }
  public loadingStart() {
    this.submitIcon.classList.add("hidden");
    this.spinnerIcon.classList.remove("hidden");
  }
  public loadingStop() {
    this.submitIcon.classList.remove("hidden");
    this.spinnerIcon.classList.add("hidden");
  }
}
