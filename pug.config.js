
export default  {
  locals: {
    YEAR: new Date().getFullYear(),
    SHA: process.env.VERCEL_GIT_COMMIT_SHA || "",
  },
};
