module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "no-console": "off",
    "no-shadow": "off",
    "prettier/prettier": ["error"],
    "react/prop-types": "off",
  },
  settings: {
    "import/core-modules": [2, "electron", "redux-devtools-extension"],
  },
};
