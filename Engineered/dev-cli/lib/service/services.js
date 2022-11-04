const path = require("path");
const fs = require("fs");
const log = require("../utils/log");
const { getConfigFile } = require("../utils");
const { HOOK_START, HOOK_KEYS } = require("./const");
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
    this.registerHooks();
    await this.emitHooks(HOOK_START);
  }

  // 解析配置文件
  async resolveConfig() {
    const { config } = this.args;
    let configFilePath = "";
    console.info("config", config);
    if (config) {
      // config 是否是绝对路径
      if (path.isAbsolute(config)) {
        configFilePath = config;
      } else {
        configFilePath = path.resolve(config);
      }
    } else {
      configFilePath = getConfigFile({ cwd: this.dir });
      // 文件是否存在
      if (configFilePath && fs.existsSync(configFilePath)) {
        this.config = require(configFilePath);
      } else {
        console.info("配置文件不存在，终止执行");
        process.exit(1);
      }
    }
    console.info("configFilePath", configFilePath);
  }

  registerHooks() {
    const { hooks = [] } = this.config;
    log.info("registerHooks", hooks);
    if (hooks && hooks.length > 0) {
      hooks.forEach((hook) => {
        const [key, fn] = hook;
        if (key && fn && HOOK_KEYS.indexOf(key) > -1) {
          if (typeof key === "string" && typeof fn === "function") {
            const exitHook = this.hooks[key];
            if (!exitHook) {
              this.hooks[key] = [];
            }
            this.hooks[key].push(fn);
          }
        }
        log.info("registerHooks", this.hooks);
      });
    }
  }
  async emitHooks(key) {
    const hooks = this.hooks[key];
    log.info("hooks", hooks);
    if (hooks) {
      for (const fn of hooks) {
        try {
          await fn(this);
        } catch (error) {
          log.error(error);
        }
      }
    }
  }
}
module.exports = Service;
