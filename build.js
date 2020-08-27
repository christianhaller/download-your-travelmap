const execa = require("execa");

(async () => {
  try {
    const res = await Promise.all(
      ["js", "html", "css"].map((task) => {
        console.log(`running: ${task}`);
        return execa("npm", ["run", `build:${task}`]);
      })
    );
    res.forEach(({ stdout, stderr }) => {
      console.log(stderr);
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
