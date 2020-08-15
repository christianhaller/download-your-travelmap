import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/frontend/index.ts",
  external: ['google'],
  output: {
    sourcemap:true,
    dir: "public",
    format: "iife",
  },
 
  plugins: [
    typescript({
      tsconfig: "./tsconfig.frontend.json",
    }),
    commonjs(),
    json(),
    terser(),
  ],
};
