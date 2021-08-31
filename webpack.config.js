const path = require("path");

module.exports = {
  entry: "./public/js/index.js",
  watch: true,
  output: {
    path: path.resolve("./dist"),
    filename: "app.js",
  },
};
