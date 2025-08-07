import defineEslintConfig from '@antfu/eslint-config'

export default defineEslintConfig({
    globals: { __VERSION__: 'readonly' },
    type: 'lib',
    ignores: [
        'eslint.config.js',
        'vitest.config.ts',
        'node_modules',
        'docs',
        'tests',
        'packages/*/types',
        'packages/*/lib',
        'packages/*/es',
        'packages/*/examples',
        'packages/**/demos'
    ],
    yaml: false,
    jsonc: false,
    stylistic: false,
    vue: {
        overrides: {
            'vue/multi-word-component-names': 'off'
        }
    },
    typescript: {
        overrides: {
            'ts/no-unused-vars': 'off',
            'ts/no-explicit-any': 'off',
            'ts/no-empty-object-type': 'off',
            'ts/no-unsafe-function-type': 'off',
            'ts/ban-types': 'off',
            'ts/explicit-function-return-type': 'off'
        },
    }
}, {
    rules: {
        'no-console': 'off',
        'no-unused-vars': 'off',
        'no-useless-call': 'off',
        'comma-dangle': 'off',
        'prefer-spread': 'off',
        'object-shorthand': 'off',
        'unused-imports/no-unused-vars': 'warn',
        'unicorn/new-for-builtins': 'off',
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-named-exports': 'off',
        'perfectionist/sort-named-imports': 'off'
    }
})
