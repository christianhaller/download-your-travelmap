describe("homepage", () => {
  const url = process.env.URL || "http://127.0.0.1:3000";

  it('form submit should respond with a map"', async () => {
    await page.goto(url);

    await expect(page.title()).resolves.toMatch(
      "Download Your TripAdvisor Travel Map (kml/csv)"
    );
    await page.type("#url", "https://www.tripadvisor.com/Profile/agaraizar");
    await page.click("button[type='submit']");

    await page.waitForSelector(".success table tbody tr");

    const found = await page.evaluate(() => window.find("Paris"));
    expect(found).toBe(true);
  }, 10000);
});
