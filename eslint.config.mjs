import prettierConfig from 'eslint-config-prettier';

import eslint from '@eslint/js';
import ts_eslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default ts_eslint.config(
    // eslint_import.flatConfigs.recommended,
    eslint.configs.recommended,
    ...ts_eslint.configs.strict,
    ...ts_eslint.configs.stylistic,
    ...pluginVue.configs['flat/recommended'],
    prettierConfig,
    {
        "rules": {
            "@typescript-eslint/no-explicit-any": "error"
        }
    },
    {
        plugins: {
          'typescript-eslint': ts_eslint.plugin,
        },
        languageOptions: {
          parserOptions: {
            parser: ts_eslint.parser,
            project: ['tsconfig.json'],
            extraFileExtensions: ['.vue'],
            sourceType: 'module',
          },
        },
        rules: {
          "@typescript-eslint/no-explicit-any": ["off"]
        }
    },
    
    
);
