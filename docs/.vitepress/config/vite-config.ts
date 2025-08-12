import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import { loadEnv } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transform from '../plugins/transform'

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = dirname(__filename)

const docPath: string = resolve(__dirname, '../../')
// const rootPath: string = resolve(__dirname, '../../../packages/')

export default defineConfig((config) => {
    const env: Record<string, string> = loadEnv(config.mode, docPath, ['VITE_'])

    console.log(env)

    return {
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
    }
})
