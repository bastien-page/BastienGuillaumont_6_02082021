const path = require("path");

// module.exports = {
//   entry: "./public/js/photographer.js",
//   watch: true,
//   output: {
//     path: path.resolve("./dist"),
//     filename: "photographer.js",
//   },
// };

module.exports = {
  entry: "./public/js/index.js",
  watch: true,
  output: {
    path: path.resolve("./dist"),
    filename: "index.js",
  },
};
