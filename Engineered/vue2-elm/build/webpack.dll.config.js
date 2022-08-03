const path = require("path");
const webpack = require("webpack");

const dllPath = "../dll";

module.exports = {
  mode: "production",
  entry: {
    vue: ["vue", "vue-router", "vuex"],
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: "[name].dll.js",
    library: "[name]_[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      name: "[name]_[hash]", // 和library保持一致,才能作为library文件进行引用
      context: process.cwd(),
    }),
  ],
};
