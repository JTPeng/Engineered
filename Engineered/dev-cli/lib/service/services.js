const path = require("path");
const fs = require("fs");
const WebpackChain = require("webpack-chain");
const log = require("../utils/log");
const { getConfigFile, loadModule } = require("../utils");
const { HOOK_START, HOOK_KEYS } = require("./const");
class Service {
  constructor(opts) {
    this.args = opts;
    this.config = {};
    this.hooks = {};
    this.plugins = [];
    this.dir = process.cwd();
    this.webpackConfig = null;
    this.internalValue = {};
  }
  // 启动服务
  async start() {
    await this.resolveConfig();
    await this.registerHooks();
    await this.emitHooks(HOOK_START);
    await this.registerPlugin();
    this.runPlugin();
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
        this.config = await loadModule(configFilePath);
      } else {
        console.info("配置文件不存在，终止执行");
        process.exit(1);
      }
    }
    this.webpackConfig = new WebpackChain();
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

  runPlugin() {
    log.info("runPlugin");
    // for (const plugin of this.plugins) {
    //   const { mod, param } = plugin;
    //   log.info("runPlugin", mod, API, options);
    //   if (!mod) {
    //     continue;
    //   }
    //   const API = {
    //     chainWebpack: this.getWebpackConfig,
    //     emitHooks: this.emitHooks,
    //     setValue: this.setValue,
    //     getValue: this.getValue,
    //     log,
    //   };
    //   const options = {
    //     ...params,
    //   };
    //   log.info("runPlugin", API, options);
    //   await mod(API, options);
    //   // console.info("runPlugin", plugin);
    // }
  }
  // 解析插件
  async registerPlugin() {
    let { plugins } = this.config;
    log.info("plugin", plugins);
    if (plugins) {
      if (typeof plugins === "function") {
        plugins = plugins();
      }
      if (Array.isArray(plugins)) {
        for (const plugin of plugins) {
          if (typeof plugin === "string") {
            const mod = await loadModule(plugin);
            log.info("mod", mod);
            this.plugins.push({
              mod,
            });
          } else if (Array.isArray(plugin)) {
            log.info("Array", plugin);
            const [pluginPath, pluginParam] = plugin;
            const mod = await loadModule(pluginPath);
            log.info("mod", mod);
            this.plugins.push({
              mod,
              param: pluginParam,
            });
          } else if (typeof plugin === "function") {
            this.plugins.push({
              mod: plugin,
            });
          }
        }
      }
    }
    log.info("aaaa");
  }

  //
  getWebpackConfig = () => {
    return this.webpackConfig;
  };

  //
  setValue = (key, value) => {
    this.internalValue[key] = value;
  };

  //
  getValue = (key) => {
    return this.internalValue[key];
  };
}
module.exports = Service;
