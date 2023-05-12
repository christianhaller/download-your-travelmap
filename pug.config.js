const vercel = require("./vercel.json");

module.exports = {
  locals: {
    DENOVERSION: "123",
    YEAR: new Date().getFullYear(),
    SHA: process.env.VERCEL_GIT_COMMIT_SHA || "",
  },
};
