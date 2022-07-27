const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const config = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "../src/main.js"),
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
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
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
      {
        test: /\.vue$/,
        loader: "vue-loader",
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
      template: path.resolve(__dirname, "../public/index.html"),
      chunks: ["index"],
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
    // vue-loader需要配合VueLoaderPlugin来使用
    new VueLoaderPlugin(),
  ],
};

module.exports = config;
