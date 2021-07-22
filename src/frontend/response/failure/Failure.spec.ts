import { Failure } from "./Failure";

describe("Failure", () => {
  test("show/hide", () => {
    const sut = new Failure(document).init();

    sut.show("critical error");
    expect(document.querySelector(".failure p").innerHTML).toBe(
      "critical error"
    );
    expect(
      document.querySelector(".failure").classList.contains("hidden")
    ).toBe(false);

    sut.hide();
    expect(
      document.querySelector(".failure").classList.contains("hidden")
    ).toBe(true);
  });
});
