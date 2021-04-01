module.exports = {
  productName: "Remote Server Manager",
  directories: {
    output: "release",
  },
  files: ["prod/", "package.json"],
  linux: {
    target: ["AppImage"],
  },
};
