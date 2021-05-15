const vercel = require("./vercel.json");

module.exports = {
  locals: {
    DENO_VERSION: vercel.build.env.DENO_VERSION,
    YEAR: new Date().getFullYear(),
    SHA: process.env.VERCEL_GIT_COMMIT_SHA || "",
  },
};
