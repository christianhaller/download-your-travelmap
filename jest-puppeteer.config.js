module.exports = {
  launch: {
    args: ["--no-sandbox"],
    headless: process.env.HEADLESS !== "false",
  },
};
