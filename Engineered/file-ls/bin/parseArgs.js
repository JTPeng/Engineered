module.exports = function parse() {
  let isAll = false; // 显示所有文件
  let isList = false; // 以列表形式显示
  const args = process.argv.slice(2);
  args.forEach((arg) => {
    if (arg.indexOf("a") >= 0) {
      isAll = true;
    }
    if (arg.indexOf("l") >= 0) {
      isList = true;
    }
  });
  return {
    args,
    isAll,
    isList,
  };
};
