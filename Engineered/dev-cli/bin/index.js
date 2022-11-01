#!/usr/bin/env node

const { Command } = require("commander");
const pag = require("../package.json");
const checkNode = require("../lib/checkNode");
const { MIN_NODE_VERSION } = require("../lib/constant");
const startServer = require("../lib/start/startServer");
const build = require("../lib/build/build");
const program = new Command();

(async () => {
  try {
    if (!checkNode(MIN_NODE_VERSION)) {
      throw new Error("Please update your node version " + MIN_NODE_VERSION);
    }
    program.version(pag.version);
    // 启动服务
    program
      .command("start")
      .description("start server by dev-cli ")
      .allowUnknownOption()
      .action(startServer);

    // 构建项目
    program
      .command("build")
      .description("build dev-cli project")
      .allowUnknownOption()
      .action(build);
    program.parse();
  } catch (error) {
    console.info(error.message);
  }
})();
