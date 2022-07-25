const REG = /<script>([\s\S]+?)<\/script>/;
module.exports = function (source) {
  console.log("source", source);
  const __source = source.match(REG);
  console.log("__source", __source);
  return __source && __source[1] ? __source[1] : __source;
};
// 判断当前模块是否为主模块,主模块则执行以下代码
// 用来单独测试loader
if (require.main === module) {
  const source = `<script>
    export default {
        name: 'jack',
        age:    36,
        sex: 'male'
    }
</script>`;
  const match = source.match(REG);
  console.log(match);
}
