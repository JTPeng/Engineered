#!/usr/bin/env node
const fs = require("fs");
const parse = require("./parseArgs");
const auth = require("./auth");
const getFileType = require("./getFileType");
const getFileUser = require("./getFileUser");
const getFileSizeDate = require("./getFileSizeDate");

const dir = process.cwd(); // 获取当前目录文件
const { args, isAll, isList } = parse();
// console.info("args =>", args, isAll, isList);
let files = fs.readdirSync(dir);
let content = "";
if (!isAll) {
  // 遍历当前文件夹下的所有文件，并排除.开头的文件
  files = files.filter((file) => file.indexOf(".") !== 0);
}
if (!isList) {
  files.forEach((file) => (content += file + "\t"));
} else {
  files.forEach((file, index) => {
    const stat = fs.statSync(file);
    const mode = stat.mode;
    const isDirectory = stat.isDirectory();
    let size = 1;
    if (isDirectory) {
      const subDir = fs.readdirSync(file);
      size = subDir.length;
    }
    const authString = auth(mode);
    let fileType = "";
    let fileUser = "";
    try {
      fileType = getFileType(mode);
      fileUser = getFileUser(stat);
    } catch (error) {
      fileType = "";
      fileUser = "";
    }
    const fileSizeDate = getFileSizeDate(stat);
    if (index === files.length - 1) {
      content +=
        fileType +
        authString +
        " " +
        size +
        "\t" +
        fileUser +
        "\t" +
        fileSizeDate +
        " " +
        file;
    } else {
      content +=
        fileType +
        authString +
        " " +
        size +
        "\t" +
        fileUser +
        "\t" +
        fileSizeDate +
        " " +
        file +
        "\n";
    }
  });
}
console.info(content);
