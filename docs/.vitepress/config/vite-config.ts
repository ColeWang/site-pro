import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [
        vueJsx()
    ],
    ssr: {
        noExternal: [
            'ant-design-vue',
            '@ant-design/icons-vue'
        ]
    }
})
