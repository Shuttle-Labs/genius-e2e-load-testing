/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["playwright"],
  extends: ["eslint:recommended", "plugin:playwright/recommended", "prettier"],
  ignorePatterns: ["node_modules", "dist", "playwright-report", "test-results"],
  rules: {
    "playwright/no-skipped-test": "warn",
  },
};
