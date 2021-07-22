module.exports = {
  theme: {},
  purge: {
    mode: "all",
    content: [
      "./src/frontend/templates/*.pug",
      "./src/frontend/response/success/Table*",
      "./src/frontend/highscore/Highscore.ts",
    ],
  },
  variants: {},
  plugins: [],
};
