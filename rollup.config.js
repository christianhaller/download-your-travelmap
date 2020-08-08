import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/frontend/index.ts",
  output: {
    dir: "public",
    format: "iife",
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.frontend.json",
    }),
    commonjs(),
    terser(),
  ],
};
