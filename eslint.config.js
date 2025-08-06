import defineEslintConfig from '@antfu/eslint-config'

export default defineEslintConfig({
    type: 'lib',
    vue: true,
    typescript: true,
    stylistic: false,
    globals: { __VERSION__: 'readonly' },
    ignores: [
        'node_modules',
        '**/examples',
        '**/demos'
    ],
    yaml: false,
    jsonc: false
}, {
    rules: {
        'object-shorthand': 'off',
        'no-useless-call': 'off',
        'no-unused-vars': 'off',
        'no-console': 'off',
        'unused-imports/no-unused-vars': 'off',
        'unicorn/new-for-builtins': 'off',
        'prefer-spread': 'off',
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-named-exports': 'off',
        'perfectionist/sort-named-imports': 'off',
        'vue/multi-word-component-names': 'off',
        'ts/no-unused-vars': 'off',
        'ts/no-explicit-any': 'off',
        'ts/no-empty-object-type': 'off',
        'ts/no-unsafe-function-type': 'off',
        'ts/ban-types': 'off',
        'ts/explicit-function-return-type': 'off'
    }
})
