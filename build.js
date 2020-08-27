const execa = require("execa");

(async () => {
  const res = await Promise.all([
    execa("npm", ["run", "tailwind"]),
    execa("npm", ["run", "postcss"]),
    execa("npm", ["run", "rollup"]),
    execa("npm", ["run", "templates"]),
  ]);
  res.forEach(({ stdout }) => {
    console.log(stdout);
  });
})();
