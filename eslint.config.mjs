import eslint from '@eslint/js';
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    { ignores: ['node_modules/', 'dist/', 'eslint.config.mjs', 'generated/prisma/'] },
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    eslintConfigPrettierFlat,
);
