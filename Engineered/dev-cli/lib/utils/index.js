const fg = require("fast-glob");
const path = require("path");
const log = require("./log");
const fs = require("fs");
const { DEFAULT_CONFIG_FILE } = require("../constant");
function getConfigFile({ cwd = process.cwd() } = {}) {
  const [filePath] = fg.sync(DEFAULT_CONFIG_FILE, {
    cwd,
    absolute: true,
  });
  log.verbose("filePath", filePath);
  return filePath;
}

async function loadModule(modulePath) {
  let fnPath = path.isAbsolute(modulePath)
    ? modulePath
    : path.resolve(modulePath);
  fnPath = require.resolve(fnPath);
  if (!fs.existsSync(fnPath)) {
    result = require(fnPath);
    return result;
  }
  return null;
}
module.exports = {
  getConfigFile,
  loadModule,
};
