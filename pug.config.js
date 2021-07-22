const vercel = require("./vercel.json");

module.exports = {
  locals: {
    DENOVERSION: vercel.build.env.DENOVERSION || "local",
    YEAR: new Date().getFullYear(),
    SHA: process.env.VERCEL_GIT_COMMIT_SHA || "",
  },
};
