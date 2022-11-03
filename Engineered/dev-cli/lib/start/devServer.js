const detectPort = require("detect-port");
const inquirer = require("inquirer");
const { DEFAULT_PORt } = require("../constant");
const Service = require("../service/services");

(async () => {
  const params = process.argv.slice(2);
  const paramObj = {};
  params.forEach((param) => {
    const paramArr = param.split(" ");
    paramObj[paramArr[0].replace("--", "")] = paramArr[1];
  });
  console.info("paramObj", paramObj);
  const { config = "" } = paramObj;
  let defaultPort = paramObj["port"] || DEFAULT_PORt;
  defaultPort = parseInt(defaultPort, 10);
  try {
    const newPort = await detectPort(defaultPort);
    if (newPort !== defaultPort) {
      // console.info(defaultPort + "port 已被占用，建议使用新端口号" + newPort);
      // 命令交互
      const questions = {
        type: "confirm",
        name: "answer",
        message: `${defaultPort}已被占用，是否启用新端口号${newPort}?`,
      };
      const { answer } = await inquirer.prompt(questions);
      if (!answer) {
        process.exit(1);
      }
    } else {
      // console.info(defaultPort + "port 可以使用");
      const args = {
        port: newPort,
        config,
      };
      process.env.NODE_ENV = "development";
      const service = new Service(args);
      await service.start();
    }
  } catch (error) {}
})();

// module.exports = function devServer() {};
