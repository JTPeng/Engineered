const { ConcatSource } = require("webpack-sources");
module.exports = class FooterPlugin {
  constructor(options) {
    console.log("FooterPlugin constructor", options);
    this.options = options;
  }
  apply(complier) {
    complier.hooks.compilation.tap("FooterPlugin", (compilation) => {
      compilation.hooks.processAssets.tap("FooterPlugin", () => {
        for (const chunk of compilation.chunks) {
          for (const file of chunk.files) {
            console.log("file", file);
            const comments = `/* ${this.options.banner} */`;
            // 更新文件
            compilation.updateAsset(
              file,
              (old) => new ConcatSource(old, "\n\n", comments)
            );
          }
        }
      });
    });
  }
};
