import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import reactNative from 'eslint-plugin-react-native';

import baseConfig from './base.js';
import reactConfig from './react.js';
import extensions from 'eslint-plugin-import/lib/rules/extensions.js';

export default tseslint.config(
  ...baseConfig,
  ...reactConfig,
  {
    name: 'Mobile ESlint rules',
    rules: {
      /* Prevent console functions to reach the user */
      'no-console': 'error',
    },
  },
  {
    name: 'React Native ESlint rules',
    rules: {
      /* Required is used in React Native (ex. importing images) */
      'global-require': 'off',
    },
  },
  {
    name: 'React Native',
    plugins: { 'react-native': reactNative },
    rules: {
      ...reactNative.configs.all.rules,
      'react-native/sort-styles': 'off',
    },
    languageOptions: {
      globals: reactNative.environments['react-native'].globals,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ios.js', '.android.js', '.ts', '.tsx', '.ios.tsx', '.android.tsx', '.json'],
        },
        'babel-module': {
          extensions: ['.js', '.ios.js', '.android.js', '.ts', '.tsx', '.ios.tsx', '.android.tsx'],
        },
        typescript: {
          extensions: ['.js', '.ios.js', '.android.js', '.ts', '.tsx', '.ios.tsx', '.android.tsx'],
          project: 'tsconfig.json',
        },
      },
    },
  },
  { name: 'Prettier', ...prettier },
);
