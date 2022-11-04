module.exports = {
  entry: "./src/main.js",
  output: "dist",
  plugin: ["dev-config-test"],
  hooks: [
    [
      "start",
      (context) => {
        console.info("created", context);
      },
    ],
  ],
};
