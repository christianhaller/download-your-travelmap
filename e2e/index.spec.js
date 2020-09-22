const execa = require("execa");
const delay = require("delay");
let sub;
describe("homepage", () => {
  beforeAll(async () => {
    console.log("wait for vercel dev");
    await delay(30000);
  }, 45000);

  it('form submit should respond with a map"', async () => {
    await page.goto("http://localhost:3000");

    await expect(page.title()).resolves.toMatch(
      "Download Your TripAdvisor Travel Map (kml/csv)"
    );
    await page.type("#url", "https://www.tripadvisor.com/Profile/agaraizar");
    await page.click("button[type='submit']");

    await page.waitForSelector("table tbody tr");

    const found = await page.evaluate(() => window.find("Paris"));
    expect(found).toBe(true);
  });
});
