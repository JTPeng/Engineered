const fg = require("fast-glob");
const log = require("./log");
const { DEFAULT_CONFIG_FILE } = require("../constant");
function getConfigFile({ cwd = process.cwd() } = {}) {
  const [filePath] = fg.sync(DEFAULT_CONFIG_FILE, {
    cwd,
    absolute: true,
  });
  log.verbose("filePath", filePath);
  return filePath;
}
module.exports = {
  getConfigFile,
};
