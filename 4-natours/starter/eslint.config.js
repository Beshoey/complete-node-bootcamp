
import js from "@eslint/js";
// import eslintPluginPrettierRecommended from 'eslint-config-prettier/recommended';
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';

import importPlugin from "eslint-plugin-import";
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nodePlugin from "eslint-plugin-n";

import prettierPlugin from 'eslint-plugin-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "eslint/config";



export default defineConfig([
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  jsxA11y.flatConfigs.recommended,
  nodePlugin.configs["flat/recommended-script"],
  eslintPluginUnicorn.configs.all,
  eslintConfigPrettierFlat,
	{
		files: ["**/*.js"],
		plugins: {
			js,
			importPlugin,
			// nodePlugin,
      jsxA11y,
      eslintPluginUnicorn,
      // eslintPluginPrettierRecommended,
      prettier: prettierPlugin,
		},
    linterOptions: {
			reportUnusedInlineConfigs: "error",
		},
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

    },
		extends: ["js/recommended"],
    settings: {
      "import/resolver": {
        // You generally want the 'node' resolver, but might need custom paths
        node: {
          extensions: ['.js', '.jsx', '.json'], // Add any other extensions your project uses
          // If you have absolute imports from 'src' or other folders:
          // paths: ['./src'], // Example: If you import 'components/Button' but it's in './src/components/Button'
        },
      },
      // You can also disable no-unresolved for specific patterns/modules if needed
      "import/ignore": [
        "eslint/config", // <--- ADD THIS LINE to ignore 'eslint/config'
        // Add other patterns if you have persistent false positives
      ]
    },
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
      "newline-per-chained-call": ["error", { ignoreChainWithDepth: 1 } ],
      // 'prettier/prettier': 'off'
      "no-console": "warn",
      "n/no-unpublished-import": "off",

		},
	},
]);
