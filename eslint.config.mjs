import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import node from "eslint-plugin-n"; // Node.js plugin
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    ignores: ["node_modules", "dist", "build"],
  },
  js.configs.recommended, // Base JS rules
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      globals: {
        Global: "readonly",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      n: node, // Node.js rules
      prettier: prettierPlugin,
    },
    rules: {
      ...ts.configs.recommended.rules,
      ...node.configs["recommended-module"].rules, // Apply Node.js-specific rules
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["error"],
      "no-var": "error",
      "prefer-const": "error",
      "n/no-missing-import": "off",
      "n/no-extraneous-import": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }], // Allow console.warn and console.error
    },
  },
  prettier,
];
