import path from "path";
import { spawn } from "child_process";

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}/dist`;

export default {
  mode: "development",
  target: "electron-renderer",
  entry: require.resolve("../src/index.jsx"),
  output: {
    publicPath: `http://localhost:${port}/dist/`,
    filename: "renderer.dev.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  devServer: {
    port,
    publicPath,
    contentBase: path.join(__dirname, "dist"),
    before() {
      console.log("Starting Main Process...");
      spawn("npm", ["run", "start:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", (code) => process.exit(code))
        .on("error", (spawnError) => console.error(spawnError));
    },
  },
};
