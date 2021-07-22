import { SubmitButton } from "./SubmitButton";

describe("SubmitButton", () => {
  const sut = new SubmitButton();
  test("init", () => {
    sut.init(document.body);
    expect(
      document.querySelector("button").classList.contains("cursor-not-allowed")
    ).toBe(false);
  });
  test("start", () => {
    sut.loadingStart();
    expect(
      document
        .querySelector("button .js-spinner-icon")
        .classList.contains("hidden")
    ).toBe(false);
    expect(
      document
        .querySelector("button .js-submit-icon")
        .classList.contains("hidden")
    ).toBe(true);
  });
  test("stop", () => {
    sut.loadingStop();
    expect(
      document
        .querySelector("button .js-spinner-icon")
        .classList.contains("hidden")
    ).toBe(true);
    expect(
      document
        .querySelector("button .js-submit-icon")
        .classList.contains("hidden")
    ).toBe(false);
  });
});
