module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: [".eslintrc.js", "./src/config.js", "/emails", "src/scripts"],
  rules: {
    indent: "off",
    "prettier/prettier": [
      "warn",
      {
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        printWidth: 80,
        arrowParens: "always",
        endOfLine: "auto",
      },
    ],
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    "no-undef": "error",
    "no-unused-vars": "warn",
    "no-fallthrough": "off",
    "no-useless-escape": "off",
  },
};
