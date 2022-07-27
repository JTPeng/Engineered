const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: {
    index: path.resolve(__dirname, "./src/index.js"),
    login: path.resolve(__dirname, "./src/login.js"),
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
    hot: true,
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 8,
          },
        },
        generator: {
          filename: "img/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.ejs$/,
        loader: "ejs-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.js$/,
        parallel: true, // 多进程并发运行
        terserOptions: {
          // Terser 压缩配置
          output: {
            comments: true,
          },
        },
        extractComments: true, // 将注释剥离到单独的文件中
      }),
      new CssMinimizerWebpackPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 300 * 1024, //大于300kb进行单独打包
      name: "common",
      cacheGroups: {
        // 依赖chunk
        jquery: {
          name: "jquery",
          test: /jquery\.js/, // jquery单独打包
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/login.html",
      chunks: ["login"],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../src/img"),
          to: path.resolve(__dirname, "../dist/img"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].chunk.css",
    }),
    new CleanWebpackPlugin(),
  ],
};
