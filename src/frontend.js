import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tailwindcss from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import baseConfig from './base.js';
import reactConfig from './react.js';

export default tseslint.config(
  ...baseConfig,
  ...reactConfig,
  ...tailwindcss.configs['flat/recommended'],
  {
    name: 'Tailwindcss settings',
    files: ['**/*.{ts,tsx,mts,cts}', '**/*.{js,jsx,mjs,cjs}'],
    settings: { tailwindcss: { callees: ['cn', 'cva'] } },
  },
  {
    name: 'JSX-a11y',
    files: ['**/*.{ts,tsx,mts,cts}', '**/*.{js,jsx,mjs,cjs}', '**/*.html'],
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      /* Do not require keyboard events on clickable non-interactive elements */
      'jsx-a11y/click-events-have-key-events': 'off',
      /* Allow <audio> and <video> tags to not include captions */
      'jsx-a11y/media-has-caption': 'off',
      /* Allow non-interactive elements to have mouse and keyboard event listeners */
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
    },
  },
  { name: 'Prettier', ...prettier },
);
