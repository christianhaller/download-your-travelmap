// https://gist.github.com/jeremyben/206bba11c3655af9032afdecd9b4a72f

// Make sure you have json-summary as a coverage reporter in your jest config.
// coverageReporters: ['json-summary', 'text', 'lcov']

import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { get } from "https";
import { ok } from "assert";

Promise.resolve().then(async () => {
  const outputDir = join(process.cwd(), "badges");

  const summaryPath = join(
    process.cwd(),
    "tmp",
    "coverage",
    "coverage-summary.json",
  );
  const summary = JSON.parse(readFileSync(summaryPath, "utf8")) as Summary;
  const summaryKeys = ["lines", "statements", "functions", "branches"] as const;

  for (const summaryKey of summaryKeys) {
    const badgeURL = getBadgeURL(summary, summaryKey);
    const badgeFile = await download(badgeURL);
    const badgePath = join(outputDir, `coverage-${summaryKey}.svg`);

    mkdirSync(outputDir, { recursive: true });
    writeFileSync(badgePath, badgeFile, "utf8");
  }
});

function getBadgeURL(summary: Summary, key: keyof jest.CoverageSummary) {
  const { pct } = summary.total[key];
  ok(typeof pct === "number", `Something wrong with the ${key} coverage`);

  // https://shields.io/category/coverage
  const coverage = `${pct}${encodeURI("%")}`;
  const colour = pct! < 80 ? "red" : pct! < 90 ? "yellow" : "brightgreen";
  const url =
    `https://img.shields.io/badge/${key}-${coverage}-${colour}?logo=jest`;

  return url;
}

async function download(url: string) {
  return new Promise<string>((resolve, reject) => {
    get(url, (res) => {
      let file = "";
      res.on("data", (chunk) => (file += chunk));
      res.on("end", () => resolve(file));
    }).on("error", reject);
  });
}

type Summary = {
  total: jest.CoverageSummary;
  [file: string]: jest.CoverageSummary;
};
