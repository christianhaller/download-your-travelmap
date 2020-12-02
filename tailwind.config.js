module.exports = {
  theme: {},
  purge: {
    mode: "all",
    content: [
      "./src/frontend/templates/*.pug",
      "./src/frontend/response/success/Table*",
      "./src/frontend/Highscore/Highscore.ts",
    ],
  },
  variants: {},
  plugins: [],
};
