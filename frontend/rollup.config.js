import resolve from "@rollup/plugin-node-resolve";
import { nodeResolve } from '@rollup/plugin-node-resolve';


export default {
  input: "src/app.js",
  output: [
    {
      format: "esm",
      file: "src/bundle.js",
    },
  ],
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx"],
    })
  ],
};