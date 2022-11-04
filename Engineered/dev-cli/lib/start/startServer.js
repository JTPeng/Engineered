const chokidar = require("chokidar");
const path = require("path");
const cp = require("child_process");
const { getConfigFile } = require("../utils");
const log = require("../utils/log");
let child;
// 1.启动服务
function runServer(args = {}) {
  const { config = "" } = args;
  const scriptPath = path.resolve(__dirname, "./devServer.js");
  child = cp.fork(scriptPath, ["--port 8080", `--config ${config}`]);
  child.on("exit", (code) => {
    if (code) {
      process.exit(code); // 退出
    }
  });
}
// 2.监听配置修改
function runWatcher() {
  const configPath = getConfigFile();
  chokidar
    .watch(configPath)
    .on("change", onChange)
    .on("error", (error) => {
      console.info(error);
      process.exit(1); // 退出
    });
}

function onChange() {
  log.verbose("onChange");
  child.kill();
  runServer();
}
module.exports = function (opts, cmd) {
  console.info("start server...", cmd.optsWithGlobals());
  // 1.通过子进程启动`webpack-dev-server`服务
  runServer(opts);
  // 2.监听配置修改
  runWatcher();
};
