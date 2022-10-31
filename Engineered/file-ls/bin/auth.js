const fs = require("fs");
module.exports = function auth(mode) {
  let authString = "";
  // u r  与操作，不相同为0
  // usr
  const canUserRead = mode & fs.constants.S_IRUSR;
  const canUserWrite = mode & fs.constants.S_IWUSR;
  const canUserExecute = mode & fs.constants.S_IXUSR;
  canUserRead ? (authString = +"r") : (authString += "-");
  canUserWrite ? (authString = +"w") : (authString += "-");
  canUserExecute ? (authString = +"x") : (authString += "-");
  // group
  const canGroupRead = mode & fs.constants.S_IRGPR;
  const canGroupWrite = mode & fs.constants.S_IWGPR;
  const canGroupExecute = mode & fs.constants.S_IXGPR;
  canGroupRead ? (authString = +"r") : (authString += "-");
  canGroupWrite ? (authString = +"w") : (authString += "-");
  canGroupExecute ? (authString = +"x") : (authString += "-");
  // other
  const canOtherRead = mode & fs.constants.S_IROTH;
  const canOtherWrite = mode & fs.constants.S_IWOTH;
  const canOtherExecute = mode & fs.constants.S_IXOTH;
  canOtherRead ? (authString = +"r") : (authString += "-");
  canOtherWrite ? (authString = +"w") : (authString += "-");
  canOtherExecute ? (authString = +"x") : (authString += "-");
  return authString;
};
