import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import json from 'eslint-plugin-json';
import tseslint from 'typescript-eslint';

const project = 'tsconfig.json';

export default tseslint.config(
  {
    name: 'Main options',
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    linterOptions: { reportUnusedDisableDirectives: true },
  },
  {
    name: 'Parser options for Typescript',
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  { ignores: ['dist/**/*', 'package.json', 'package-lock.json', 'src/generated/**/*.{js,jsx,ts,tsx}'] },
  { name: 'ESlint recommended rules', ...eslint.configs.recommended },
  {
    name: 'ESlint rules',
    files: ['**/*.{ts,tsx,mts,cts}', '**/*.{js,jsx,mjs,cjs}'],
    rules: {
      /* For ease of use */
      'class-methods-use-this': 'off',
      /* Enforce camelCase */
      camelcase: ['error', { allow: ['^src_*'] }],
      /* We allow console for debug and error reporting */
      'no-console': 'error',
      /* Allow void for async functions */
      'no-void': ['error', { allowAsStatement: true }],
      /* Disabled this rule since it doesn't allow re-exporting default from index files */
      'no-restricted-exports': 'off',
      /* Allow leading underscore dangle for apollo gql __typename */
      'no-underscore-dangle': ['error', { allow: ['__typename'] }],
      /* Restrict function syntax (no arrow functions) */
      'func-style': ['error', 'expression'],
      /* Restric function syntax in objects */
      'object-shorthand': 'error',
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    name: 'Typescript ESlint rules',
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      /* Allow hoisting for functions for better code readability */
      '@typescript-eslint/no-use-before-define': 'off',
      /* There are several cases that we need to use a promise as a callback */
      '@typescript-eslint/no-misused-promises': 'off',
      /* This rule is too restrictive */
      '@typescript-eslint/return-await': 'off',
      /* Disable unused-vars error when need to omit a field from object, { omitedField, ...params } = obj */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],
      /* Require only objects to convert to string */
      '@typescript-eslint/restrict-template-expressions': 'error',
      /* Allow leading underscore for apollo gql __typename and lodash - already is allowed */
      '@typescript-eslint/naming-convention': [
        'error',
        {
          leadingUnderscore: 'allow',
          selector: 'default',
          format: null,
        },
      ],
    },
  },
  {
    name: 'Typescript ESlint rules (ignore .d.ts)',
    ignores: ['**/*.d.ts'],
    rules: {
      /* Restrict declaring types only as types (interfaces error) */
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    }
  },
  {
    name: 'Import',
    files: ['**/*.{ts,tsx,mts,cts}', '**/*.{js,jsx,mjs,cjs}'],
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      /* Duplicate from typescript */
      'import/named': 'off',
      /* Duplicate from typescript */
      'import/namespace': 'off',
      /* Duplicate from typescript */
      'import/default': 'off',
      /* Duplicate from typescript */
      'import/no-named-as-default-member': 'off',
      /* Duplicate from typescript */
      'import/no-unresolved': 'off',
      /* Allow default export of anonymous objects */
      'import/no-anonymous-default-export': ['error', { allowObject: true }],
      /* Allow default naming be the same as exported variables */
      'import/no-named-as-default': 'off',
    },
    settings: {
      ...importPlugin.configs.typescript.settings,
      'import/resolver': {
        ...importPlugin.configs.typescript.settings['import/resolver'],
        typescript: { project },
      },
    },
  },
  {
    name: 'JSON',
    files: ['**/*.{json,jsonc}'],
    plugins: { json },
    rules: json.configs['recommended'].rules,
  },
  { name: 'Prettier', ...prettier },
);
