import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [
        vueJsx()
    ],
    ssr: {
        noExternal: [
            '@ant-design/icons-vue',
            'ant-design-vue',
            '@site-pro/components',
            '@site-pro/plugins',
            '@site-pro/utils',
            '@site-pro/hooks'
        ]
    }
})
