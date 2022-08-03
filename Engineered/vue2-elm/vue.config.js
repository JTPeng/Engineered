const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

console.log("process.env.MEASURE", process.env.MEASURE);
const smp = new SpeedMeasurePlugin({
  disable: !(process.env.MEASURE === "true"), // 是否开启 true不启动
  outputFormat: "human",
});
module.exports = {
  publicPath: "./",
  parallel: true,
  configureWebpack: smp.wrap({
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
      },
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.js$/,
    //       exclude: /node_modules/,
    //       use: [
    //         {
    //           loader: "thread-loader",
    //           options: {
    //             worker: 5,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    plugins: [
      new BundleAnalyzer({
        analyzerMode: process.env.BUILD === "true" ? "server" : "false",
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: path.resolve(__dirname, "./dll/vue-manifest.json"), // 排除掉的内容
      }),
      new AddAssetHtmlPlugin({
        // 需要引入的是dll内的dll文件,而不是dist目录下,因为htmlWebpackPlugin在工作时,dll.js文件还没生成
        filepath: path.resolve(__dirname, "./dll/vue.dll.js"),
      }),
    ],
  }),
};
