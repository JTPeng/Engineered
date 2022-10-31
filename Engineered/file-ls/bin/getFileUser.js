const cp = require("child_process");
module.exports = function getFileUser(stat) {
  const { uid, gid } = stat;
  let username = cp
    .execSync("id -un " + uid)
    .toString()
    .trim();
  console.info("object", username);
  let groupIdsStr = cp
    .execSync("id -G " + uid)
    .toString()
    .trim();
  let groupIds = groupIdsStr.split(" ");
  let groupIdsNameStr = cp
    .execSync("id -Gn " + uid)
    .toString()
    .trim();
  let groupIdsName = groupIdsNameStr.split(" ");
  const index = groupIds.findIndex((id) => +id === gid);
  groupName = groupIdsName[index];
  return username + " " + groupName;
};
