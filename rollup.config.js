import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
  {
    external:['bootstrap', 'mmuo'],
    input: "index.js", // your entry point
    output: {
      name: "ije", // package name
      file: pkg.browser,
      format: "umd",
      globals:{
        'bs':"bootstrap",
        'mmuo':"mmuo"
      },
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
  {
    input: "index.js", // your entry point
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
];