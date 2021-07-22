import { Highscore } from "./Highscore";

const mockResponse = [
  {
    username: "christianhaller",
    date: 123,
    cities: 2,
    countries: 4,
    url: "url",
  },
  {
    username: "anneka",
    date: 123,
    cities: 2,
    countries: 99,
    url: "url",
  },
  {
    username: "another user",
    date: 123,
    cities: 2,
    countries: 333,
    url: "url",
  },
  {
    username: "user4",
    date: 123,
    cities: 2,
    countries: 100,
    url: "url",
  },
];

describe("Highscore", () => {
  it("renders table", async () => {
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await new Highscore(document).init();
    expect(document.querySelector(".highscore").innerHTML).toMatchSnapshot();
  });

  it("formats", async () => {
    let sut = Highscore.timeSince(
      new Date(1604052601425),
      new Date(1604052601425 - 3600 * 1000)
    );
    expect(sut).toMatchSnapshot();

    sut = Highscore.timeSince(
      new Date(1604052601425),
      new Date(1604052601425 - 60 * 1000)
    );
    expect(sut).toMatchSnapshot();

    sut = Highscore.timeSince(
      new Date(1604052601425),
      new Date(1604052601425 - 1 * 1000)
    );
    expect(sut).toMatchSnapshot();

    sut = Highscore.timeSince(
      new Date(1604052601425),
      new Date(1604052601425 - 3600 * 1000 * 24)
    );
    expect(sut).toMatchSnapshot();

    sut = Highscore.timeSince(
      new Date(1604052601425),
      new Date(1604052601425 - 3600 * 1000 * 25)
    );
    expect(sut).toMatchSnapshot();

    sut = Highscore.timeSince(
      new Date(1604052601425),
      new Date(1604052601425 - 3600 * 1000 * 24 * 365)
    );
    expect(sut).toMatchSnapshot();

    sut = Highscore.timeSince(
      new Date(1604052601425),
      new Date(1604052601425 - 3600 * 1000 * 24 * 366)
    );
    expect(sut).toMatchSnapshot();
  });
});
