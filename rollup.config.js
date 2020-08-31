import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default ["initial", "success"].map((name) => ({
  input: `src/frontend/${name}.ts`,
  external: ["google"],
  output: {
    sourcemap: true,
    dir: "public",
    format: "iife",
  },
  plugins: [
    typescript({
      tsconfig: "./src/frontend/tsconfig.json",
    }),
    commonjs(),
    json(),
    terser(),
  ],
}));
