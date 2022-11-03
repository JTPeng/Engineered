const path = require("path");
const fs = require("fs");
const fg = require("fast-glob");
const log = require("../utils/log");
const { DEFAULT_CONFIG_FILE } = require("../constant");
class Service {
  constructor(opts) {
    this.args = opts;
    this.config = {};
    this.hooks = {};
    this.dir = process.cwd();
  }
  // 启动服务
  async start() {
    this.resolveConfig();
  }

  // 解析配置文件
  async resolveConfig() {
    const { config } = this.args;
    let configFilePath = "";
    if (config) {
      // config 是否是绝对路径
      if (path.isAbsolute(config)) {
        configFilePath = config;
      } else {
        configFilePath = path.resolve(config);
      }
    } else {
      const [filePath] = fg.sync(DEFAULT_CONFIG_FILE, {
        cwd: this.dir,
        absolute: true,
      });
      console.info("filePath", filePath);
      configFilePath = filePath;
      // 文件是否存在
      if (configFilePath && fs.existsSync(configFilePath)) {
        this.config = require(configFilePath);
        log.verbose("config", this.config);
        log.info("config", this.config);
      } else {
        console.info("配置文件不存在，终止执行");
        process.exit(1);
      }
    }
    console.info("configFilePath", configFilePath);
  }
}
module.exports = Service;
