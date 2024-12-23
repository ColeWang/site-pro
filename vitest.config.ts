import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
    ],
    test: {
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        include: ['tests/**/*.{test,spec,type-test}.{js,mjs,cjs,ts,tsx,jsx}'],
        coverage: {
            provider: 'istanbul',
            include: ['packages/**/src/**/*.{ts,tsx}'],
            exclude: []
        }
    }
})
