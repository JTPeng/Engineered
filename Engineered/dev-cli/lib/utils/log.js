const npmlog = require("npmlog");
const { LOG_LEVELS } = require("../constant");
const level =
  LOG_LEVELS.indexOf(process.env.LOG_LEVELS) >= 0
    ? process.env.LOG_LEVELS
    : "info";
npmlog.level = level;

module.exports = npmlog;
