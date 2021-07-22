import { UrlInput } from "./UrlInput";

jest.useFakeTimers();

describe("UrlInput", () => {
  const sut = new UrlInput();
  test("init", () => {
    const handler = jest.fn();
    document.body.addEventListener("submit", handler);
    sut.init(document.body);
    document.querySelector("#url").dispatchEvent(new Event("paste"));
    jest.runAllTimers();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("get", () => {
    sut.setValue("abc");
    sut.init(document.body);
    expect(sut.getValue()).toBe("abc");
  });

  test("focus", () => {
    sut.setFocus();
    expect(document.activeElement === document.querySelector("#url")).toBe(
      true
    );
  });
});
