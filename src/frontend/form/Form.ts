import loadjs from "loadjs";
import { validate } from "./validate";
import { UrlInput } from "./UrlInput";
import { SubmitButton } from "./SubmitButton";
import type { Response } from "../../backend/interace";
import { Failure } from "../response/failure/Failure";

export class Form {
  private submitButton: SubmitButton;
  private urlInput: UrlInput;
  private el: HTMLFormElement;
  private doc: HTMLDocument;
  private failure: Failure;

  constructor(document: HTMLDocument) {
    this.doc = document;
  }

  async submit(e: Event) {
    e.preventDefault();

    this.doc.dispatchEvent(new CustomEvent("success.hide"));
    this.failure.hide();

    try {
      const url = new URL(this.urlInput.getValue());
      validate(url);
      this.submitButton.loadingStart();
      const [res] = await Promise.all([
        fetch(`/api?url=${url}`),
        loadjs("/success.js", { returnPromise: true, async: true }),
      ]);

      this.submitButton.loadingStop();
      if (res.ok) {
        const detail: Response = await res.json();

        this.doc.dispatchEvent(new CustomEvent("success.show", { detail }));
        const newURL = new URL(window.location.href);
        newURL.searchParams.set("url", url.href);
        if (window.location.href !== newURL.href) {
          window.history.replaceState(null, "", newURL.href);
        }
      } else {
        throw new Error(
          "profile not found. try something like https://www.tripadvisor.com/Profile/theplanetd"
        );
      }
    } catch (e) {
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
        return (e: Event) => {
          e.preventDefault();
          this.urlInput.setFocus();
        };
      })(),
      true
    );

    this.urlInput = new UrlInput().init(this.el);
    this.submitButton = new SubmitButton().init(this.el);
    this.failure = new Failure(this.doc).init();
    return this;
  }
  autoSubmit(url: string): void {
    this.urlInput.setValue(url);
    this.el.dispatchEvent(new Event("submit", { cancelable: true }));
  }
}
