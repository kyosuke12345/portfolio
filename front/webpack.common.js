// eslint-why importでは動かない為
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin =
  require("tsconfig-paths-webpack-plugin").TsconfigPathsPlugin;

module.exports = {
  entry: path.resolve(__dirname, "src") + "/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/s,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "environment.accessTokenRefreshTime": 60 * 5,
    }),
  ],
};
