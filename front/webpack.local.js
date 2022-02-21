// eslint-why importでは動かない為
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = merge.merge(common, {
  mode: "development",
  target: "web",
  plugins: [
    new webpack.DefinePlugin({
      "environment.mode": JSON.stringify("local"),
    }),
  ],
  devtool: "inline-source-map",
  output: {
    publicPath: "/javascript",
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "/public"),
    },
    open: true,
    historyApiFallback: true,
    // overlay: true,
    // proxy: {
    //   '/accesslog/api': {
    //     target: 'http://localhost:9100',
    //   },
    // },
  },
});
