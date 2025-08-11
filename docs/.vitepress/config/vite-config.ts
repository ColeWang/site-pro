import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transform from '../plugins/transform'

export default defineConfig({
    plugins: [
        vueJsx(),
        transform()
    ],
    ssr: {
        noExternal: [
            '@ant-design/icons-vue',
            'ant-design-vue'
        ]
    }
})
