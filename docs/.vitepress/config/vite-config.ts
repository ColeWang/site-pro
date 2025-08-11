import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mdTransform from '../plugins/md-transform'

export default defineConfig({
    plugins: [
        vueJsx(),
        mdTransform()
    ],
    ssr: {
        noExternal: [
            '@ant-design/icons-vue',
            'ant-design-vue'
        ]
    }
})
