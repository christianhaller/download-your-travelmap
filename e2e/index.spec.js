const delay = require("delay");
const execa = require("execa");

describe("homepage", () => {
  const url = process.env.URL || "http://127.0.0.1:3000";
  console.log(url);

  it('form submit should respond with a map"', async () => {
    await page.goto(url);

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
