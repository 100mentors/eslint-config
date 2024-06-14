import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    name: 'Frontend ESlint rules',
    rules: {
      /* Logger expects these console functions */
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
  },
  {
    name: 'React',
    files: ['**/*.{ts,tsx,mts,cts}', '**/*.{js,jsx,mjs,cjs}'],
    plugins: { react: react },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      /* Disable PropTypes */
      'react/prop-types': 'off',
      /* Explicitly set filename if it includes jsx */
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', 'tsx'] }],
      /* Make all components arrow functions */
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      /* Prevent unescaped template characters */
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      /* Nesting components are a bad practice */
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      /* Prevent indices as keys */
      'react/no-array-index-key': 'error',
    },
    languageOptions: {
      parserOptions: {
        ...react.configs.recommended.parserOptions,
        ...react.configs['jsx-runtime'].parserOptions,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: { react: { version: 'detect' } },
  },
  {
    name: 'React hooks',
    files: ['**/*.{ts,tsx,mts,cts}', '**/*.{js,jsx,mjs,cjs}'],
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
);
