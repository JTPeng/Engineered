export default {
  entry: "./src/main.js",
  plugins: ["dev-config-test"],
  hooks: [
    [
      "created",
      function (context) {
        console.info("created", context);
      },
    ],
  ],
};
