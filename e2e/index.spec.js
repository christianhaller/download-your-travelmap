const delay = require("delay");
const execa = require("execa");

describe("homepage", () => {
  let sub;
  beforeAll(async () => {
    sub = execa("npm", ["run", "vercel:dev"], {
      env: {
        __VERCEL_SKIP_DEV_CMD: true,
      },
    });
    await delay(20000);
  }, 65000);

  it('form submit should respond with a map"', async () => {
    await page.goto("http://127.0.0.1:3000");

    await expect(page.title()).resolves.toMatch(
      "Download Your TripAdvisor Travel Map (kml/csv)"
    );
    await page.type("#url", "https://www.tripadvisor.com/Profile/agaraizar");
    await page.click("button[type='submit']");

    await page.waitForSelector("table tbody tr");

    const found = await page.evaluate(() => window.find("Paris"));
    expect(found).toBe(true);
  }, 10000);
  afterAll(() => {
    sub.cancel();
  });
});
