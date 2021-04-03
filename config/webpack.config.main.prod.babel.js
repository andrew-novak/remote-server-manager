import path from "path";
import { EnvironmentPlugin } from "webpack";

export default {
  mode: "production",
  target: "electron-main",
  entry: require.resolve("../src/main/index.js"),
  output: {
    path: path.join(__dirname, "../prod/bundle"),
    filename: "main.prod.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [require.resolve("babel-loader")],
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: "production",
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
};
