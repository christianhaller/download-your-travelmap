const { JSDOM } = require("JSDOM");
const { readFileSync } = require("fs");
const { compile } = require("pug");

(() => {
  const templateFile = readFileSync("./src/frontend/templates/index.pug", {
    encoding: "utf8",
  });
  const template = compile(templateFile, {
    filename: "rr",
    basedir: "./src/frontend/templates",
  });

  const page = new JSDOM(template());
  document.body.innerHTML = page.window.document.body.innerHTML;
})();
