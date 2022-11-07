module.exports = {
  entry: "./src/main.js",
  output: "dist",
  plugins: function () {
    return [
      // "dev-config-test",
      ["dev-config-test", { a: 1, b: 2 }],
      // ["./plugins/dev-cli-plugin.js", { c: 3, d: 4, e: 5 }],
      function (api, options) {
        console.info("plugins function", api, options);
      },
    ];
  },
  // plugins: [
  //   "dev-config-test",
  //   ["dev-config-test", { a: 1, b: 2 }],
  //   ["./plugins/dev-cli-plugin.js", { c: 3, d: 4, e: 5 }],
  // ],
  // hooks: [
  //   [
  //     "start",
  //     (context) => {
  //       console.info("created", context);
  //     },
  //   ],
  // ],
};
