import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = dirname(__filename)

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        include: ['./tests/**/*.{test,spec,type-test}.{js,mjs,cjs,ts,tsx,jsx}'],
        coverage: {
            provider: 'v8',
            include: ['packages/**/src/**/*.{ts,tsx}'],
            exclude: []
        }
    },
    plugins: [
        vue(),
        vueJsx(),
    ],
    resolve: {
        alias: {
            '@site-pro/components': resolve(__dirname, './packages/components/src'),
            '@site-pro/hooks': resolve(__dirname, './packages/hooks/src'),
            '@site-pro/locale': resolve(__dirname, './packages/locale/src'),
            '@site-pro/plugins': resolve(__dirname, './packages/plugins/src'),
            '@site-pro/utils': resolve(__dirname, './packages/utils/src')
        }
    },
    define: {
        '__VERSION__': `'1.0.0'`
    }
})
