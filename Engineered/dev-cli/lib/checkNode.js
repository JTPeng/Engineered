const semver = require("semver");
module.exports = function checkNode(minNodeVersion) {
  // 获取node版本号
  const currentNodeVersion = semver.valid(semver.coerce(process.version));
//   console.info("currentNodeVersion", currentNodeVersion);
  if (semver.satisfies(currentNodeVersion, ">=" + minNodeVersion)) {
    return true;
  } else {
    return false;
  }
};
