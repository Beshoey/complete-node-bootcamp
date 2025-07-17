import js from '@eslint/js';
import { default as configPrettier, default as prettier } from 'eslint-config-prettier';
import pluginNode from "eslint-plugin-node";
import pluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import globals from "globals";
// import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  js.configs.recommended,
  prettier,
  pluginNode.configs.recommended,
  pluginPrettier.configs.recommended,
  configPrettier,
  {
    files: ['**/*.js'],
    plugins: {
      prettier: pluginPrettier,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,

    },

    globals: {
      ...globals.node,
    },

    rules: {
      'no-console': 'warn',
      'spaced-comment': 'off',
      'consistent-return': 'off',
      'func-names': 'off',
      'object-shorthand': 'off',
      'no-process-exit': 'off',
      'no-param-reassign': 'off',
      'no-return-await': 'off',
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
      'prettier/prettier': 'error'
    },

  }
]);
