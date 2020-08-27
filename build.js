const execa = require("execa");

(async () => {
  try {
    const res = await Promise.all([
      execa("npm", ["run", "tailwind"]),
      execa("npm", ["run", "rollup"]),
      execa("npm", ["run", "templates"]),
    ]);
    res.forEach(({ stdout }) => {
      console.log(stdout);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
})();

process.on("unhandledRejection", function (reason, p) {
  console.log(
    "Possibly Unhandled Rejection at: Promise ",
    p,
    " reason: ",
    reason
  );
});
