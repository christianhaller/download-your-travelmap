const delay = require("delay");
const execa = require("execa");

describe("homepage", () => {
  beforeAll(async () => {
    execa("npm", ["run", "vercel:dev"]);
    console.log("done");
    await delay(30000);
    console.log("waited 30 seconds");
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
});
