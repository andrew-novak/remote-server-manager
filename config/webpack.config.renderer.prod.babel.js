import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "production",
  target: "electron-renderer",
  entry: require.resolve("../src/renderer/index.jsx"),
  output: {
    path: path.join(__dirname, "../prod"),
    filename: "renderer.prod.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [require.resolve("babel-loader")],
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/renderer/index.html",
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
};
