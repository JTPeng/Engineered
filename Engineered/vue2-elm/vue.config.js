const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
console.log("process.env.MEASURE", process.env.MEASURE);
const smp = new SpeedMeasurePlugin({
  disable: !(process.env.MEASURE === "true"), // 是否开启 true不启动
  outputFormat: "human",
});
module.exports = {
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
    ],
  }),
};
