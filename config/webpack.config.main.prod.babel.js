import path from "path";

export default {
  mode: "production",
  target: "electron-main",
  entry: require.resolve("../src/main/index.js"),
  output: {
    path: path.join(__dirname, "../prod"),
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
  node: {
    __dirname: false,
    __filename: false,
  },
  optimization: {
    minimize: false,
  },
};
