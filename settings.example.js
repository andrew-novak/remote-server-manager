module.exports = {
  locations: {
    local: {
      temporary: "path to the dir that will store temporary files",
    },
    remote: {
      sections: {
        config: "path to nginx conf.d directory",
        static: "path to nginx static files directory",
      },
    },
  },
};
