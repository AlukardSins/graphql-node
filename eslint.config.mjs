import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['dist', 'node_modules', 'coverage', 'build', 'public'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node },
    plugins: { js },
    extends: [
      'js/recommended',
      ...tseslint.configs.recommended,
      'prettier'
    ],
    parser: tseslint.parser,
  },
]);
