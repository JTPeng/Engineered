export default {
  entry: "./src/main.js",
  plugin: ["dev-config-test"],
  hooks: [
    [
      "created",
      function (context) {
        console.info("created", context);
      },
    ],
  ],
};
