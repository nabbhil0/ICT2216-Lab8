import reactPlugin from "eslint-plugin-react";
import jestPlugin from "eslint-plugin-jest";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import pluginSecurity from "eslint-plugin-security";
import securityNode from "eslint-plugin-security-node";
import eslintPluginNoUnsanitized from "eslint-plugin-no-unsanitized";

export default [
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "coverage/**",
      "reports/**",
    ],
  },

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react: reactPlugin,
      security: pluginSecurity,
      "security-node": securityNode,
      "no-unsanitized": eslintPluginNoUnsanitized,
    },

    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "security/detect-eval-with-expression":"error",
      "security-node/detect-crlf": "error",
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",

    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    files: [
      "**/*.test.{js,jsx}",
      "**/*.spec.{js,jsx}",
      "**/__tests__/**/*.{js,jsx}",
    ],

    plugins: {
      jest: jestPlugin,
      "testing-library": testingLibraryPlugin,
    },

    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      "testing-library/await-async-events": "off",
    },

    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        it: "readonly",
        jest: "readonly",
      },
    },
  },
];
