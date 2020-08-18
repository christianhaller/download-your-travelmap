import { validate } from "./validate";
import { UrlInput } from "./UrlInput";
import { SubmitButton } from "./SubmitButton";
import type { Response } from "../../backend/interace";
import { Success } from "../response/success/Success";

export class Form {
  private submitButton: SubmitButton;
  private urlInput: UrlInput;

  private el: HTMLFormElement;
  private doc: HTMLDocument;
  private success: Success;

  constructor(document: HTMLDocument, success: Success) {
    this.doc = document;
    this.success = success;
  }

  async submit(e: Event) {
    e.preventDefault();
    this.success.hide();

    try {
      const url = new URL(this.urlInput.getValue());
      validate(url);
      this.submitButton.loadingStart();
      const res = await fetch(`/api?url=${url}`);
      this.submitButton.loadingStop();
      if (res.ok) {
        const data: Response = await res.json();
        this.success.init(data).show();
      } else {
        throw Error("url not okay");
      }
    } catch (e) {
      this.success.hide();
      this.urlInput.setFocus();
      console.log(e.stack);
    }
  }

  init() {
    this.el = this.doc.querySelector("form");
    this?.el.addEventListener("submit", (e: Event) => this.submit(e));
    this.urlInput = new UrlInput().init(this.el);
    this.submitButton = new SubmitButton().init(this.el);
    this.success = new Success(".success", this.doc);
  }
}
