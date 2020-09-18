const puppeteer = require("puppeteer");
const fn = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  console.log(await page.title());
  await page.type("#url", "https://www.tripadvisor.com/Profile/agaraizar");
  await page.click("button[type='submit']");

  await page.waitForSelector("table tbody tr");
  const found = await page.evaluate(() => window.find("Paris"));
  console.log(found);
};
fn();
