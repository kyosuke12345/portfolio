// eslint-why importでは動かない為
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = merge.merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "environment.mode": JSON.stringify("production"),
    }),
  ],
  output: {
    path: path.resolve(__dirname, "public/javascript"),
    filename: "bundle.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: /@license/i,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
});
