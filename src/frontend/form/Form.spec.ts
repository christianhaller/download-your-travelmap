import { Form } from "./Form";

let url;
let failureShowMock;
const body = jest.mock("../response/failure/Failure", () => ({
  Failure: jest.fn(() => ({
    init: jest.fn(() => ({
      hide: jest.fn(),
      show: failureShowMock,
    })),
  })),
}));

jest.mock("../success", () => {});

jest.mock("./UrlInput", () => ({
  UrlInput: jest.fn(() => ({
    init: () => ({
      setFocus: () => {},
      getValue: (): string => {
        return url;
      },
      setValue: () => {},
    }),
  })),
}));

jest.mock("./SubmitButton", () => ({
  SubmitButton: jest.fn(() => ({
    init: () => ({
      loadingStart: () => {},
      loadingStop: () => {},
    }),
  })),
}));

const mockSuccessResponse = {
  language: "en",
  username: "christianhaller",
  places: [
    {
      lat: 50.444885,
      lng: 30.536667,
      flags: ["been"],
      city: "Kyiv(Kiev)",
      country: "Ukraine",
    },
    {
      lat: -34.45451,
      lng: -57.83755,
      flags: ["been"],
      city: "Colonia del Sacramento",
      country: "Uruguay",
    },
  ],
};

describe("Form", () => {
  test("submit valid url", async () => {
    document.addEventListener("success.show", function (opt: any): void {
      expect(opt.detail).toMatchSnapshot();
    });

    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    url = "https://tripadvisor.com/abc";
    new Form(document).init();

    document.querySelector("form").dispatchEvent(new Event("submit"));
  });

  test("submit invalid url", () => {
    url = "garbage";

    failureShowMock = jest.fn(() => {
      expect(failureShowMock).toHaveBeenCalledWith("Invalid URL: garbage");
    });
    new Form(document).init();

    document
      .querySelector("button")
      .dispatchEvent(new Event("submit", { bubbles: true }));
  });

  test("autosubmit", () => {
    url = "https://tripadvisor.com/abc";
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    document.addEventListener("success.show", function (opt: any): void {
      expect(opt.detail).toMatchSnapshot();
    });
    new Form(document)
      .init()
      .autoSubmit("https://www.tripadvisor.com/members/abc");
  });

  test("fetch failed", () => {
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      ok: false,
      json: () => mockJsonPromise,
    });

    failureShowMock = jest.fn(() => {
      expect(failureShowMock).toHaveBeenCalled();
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    url = "https://www.tripadvisor.it/members/me";
    new Form(document).init();

    document
      .querySelector("button")
      .dispatchEvent(new Event("submit", { bubbles: true }));
  });

  test("invalid by browser", () => {
    new Form(document).init();
    document
      .querySelector("form")
      .dispatchEvent(new Event("invalid", { bubbles: true }));

    expect(document.activeElement === document.querySelector("#url"));
  });
});
