const execa = require("execa");

const run = async() => {

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

};

run().catch((e) => { console.error(e.message) ,process.exit(1)})
