const chokidar = require("chokidar");
const path = require("path");
const cp = require("child_process");
// const devServer = require("./devServer");
let child;
// 1.启动服务
function runServer() {
  const scriptPath = path.resolve(__dirname, "./devServer.js");
  child = cp.fork(scriptPath, ["--port 8080"]);
  child.on("exit", (code) => {
    if (code) {
      process.exit(1); // 退出
    }
  });
}
// 2.监听配置修改
function runWatcher() {
  const configPath = path.resolve(__dirname, "./config.json");
  const watcher = chokidar
    .watch(configPath)
    .on("change", onChange)
    .on("error", (error) => {
      console.info(error);
      process.exit(1); // 退出
    });
}

function onChange() {}
module.exports = function (arg, opts, cmd) {
  console.info("start server...");
  // 1.通过子进程启动`webpack-dev-server`服务
  runServer();
  // 2.监听配置修改
  runWatcher();
};
