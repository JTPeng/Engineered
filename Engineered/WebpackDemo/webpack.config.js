const path = require("path");
const { BannerPlugin } = require("webpack");
const FooterPlugin = require("./plugin/FooterPlugin");
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      //   {
      //     test: /.css$/,
      //     use: ["style-loader", "css-loader"],
      //   },
      {
        test: /\.other$/,
        use: [path.resolve(__dirname, "./loader/other.js")],
      },
    ],
  },
  plugins: [
    new BannerPlugin({
      banner: "Webpack BannerPlugin",
    }),
    new FooterPlugin({
      banner: "JT",
    }),
  ],
};
