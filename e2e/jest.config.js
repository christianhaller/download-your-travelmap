module.exports = {
  bail: 1,

  verbose: true,
  preset: "jest-puppeteer",
  cacheDirectory: "tmp/jest",
  testMatch: ["<rootDir>/**/?(*.)+(spec|test).[tj]s?(x)"],
};
