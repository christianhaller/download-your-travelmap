import { DownloadButton } from "./DownloadButton";

describe("DownloadButton", () => {
  document.body.innerHTML =
    '<a id="download" class="cursor-not-allowed" ><span></span></a>';

  global.URL.createObjectURL = jest.fn(() => {
    return "x";
  });

  const sut = new DownloadButton();
  test("init", () => {
    sut.init(document.body, new Blob(), "christian");
    const button = document.querySelector("#download");
    expect(button.classList.contains("cursor-not-allowed")).toBe(false);
    expect(button).toMatchSnapshot();
  });
});
