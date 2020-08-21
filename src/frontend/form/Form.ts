import { validate } from "./validate";
import { UrlInput } from "./UrlInput";
import { SubmitButton } from "./SubmitButton";
import type { Response } from "../../backend/interace";
import { Success } from "../response/success/Success";
import { Failure } from "../response/failure/Failure";

export class Form {
  private submitButton: SubmitButton;
  private urlInput: UrlInput;

  private el: HTMLFormElement;
  private doc: HTMLDocument;
  private success: Success;
  private failure: Failure;

  constructor(document: HTMLDocument) {
    this.doc = document;
  }

  async submit(e: Event) {
    e.preventDefault();
    this.success.hide();
    this.failure.hide();

    try {
      const url = new URL(this.urlInput.getValue());
      validate(url);
      this.submitButton.loadingStart();
      const res = await fetch(`/api?url=${url}`);
      this.submitButton.loadingStop();
      if (res.ok) {
        const data: Response = await res.json();
        this.success.init(data).show();
        const newURL = new URL(window.location.href);
        newURL.searchParams.set('url',url.href);
        window.history.replaceState(null, "fff",newURL.href);
      } else {
        throw Error("profile not found");
      }
    } catch (e) {
      this.success.hide();
      this.urlInput.setFocus();
      this.failure.show(e.message);
      console.log(e.stack);
    }
  }

  init() {
    this.el = this.doc.querySelector("form");
    this?.el.addEventListener("submit", (e: Event) => this.submit(e));
    this.doc.addEventListener(
      "invalid",
      (() => {
        return (e) => {
          e.preventDefault();
          this.urlInput.setFocus();
        };
      })(),
      true
    );

    this.urlInput = new UrlInput().init(this.el);
    this.submitButton = new SubmitButton().init(this.el);
    this.success = new Success(this.doc);
    this.failure = new Failure(this.doc).init();
    return this;
  }
  autoSubmit(url: string): void {
    this.urlInput.setValue(url);
    this.el.dispatchEvent(new Event("submit"));
  }
}
