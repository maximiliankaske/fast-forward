import { defineConfig } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { dependencies } from "./package.json";

export default defineConfig({
  entry: ["src/index.tsx"],
  outDir: "dist",
  splitting: false,
  bundle: true,
  minify: false,
  sourcemap: true,
  format: ["cjs", "esm"],
  dts: true,
  target: "node12",
  platform: "browser",
  esbuildPlugins: [vanillaExtractPlugin()],
  external: Object.keys(dependencies), // .concat(Object.keys(peerDependencies)),
  clean: true,
});
