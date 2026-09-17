const tseslint = require("typescript-eslint");

module.exports = [
  {
    files: ["lib/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: "tsconfig.json", sourceType: "module" },
    },
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-unsafe-function-type": "error",
      "@typescript-eslint/no-wrapper-object-types": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/unified-signatures": "error",
      "arrow-body-style": "error",
      "constructor-super": "error",
      "dot-notation": "error",
      "guard-for-in": "error",
      "no-bitwise": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-invalid-this": "error",
      "no-new-wrappers": "error",
      "no-undef-init": "error",
      "object-shorthand": "error",
      "prefer-const": "error",
    },
  },
];
