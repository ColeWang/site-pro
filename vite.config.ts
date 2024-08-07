import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function readPackageFile () {
    const urlPath = new URL('./package.json', import.meta.url)
    const file = readFileSync(urlPath, 'utf-8')
    return JSON.parse(file)
}

export default defineConfig(() => {
    const { version } = readPackageFile()
    return {
        plugins: [
            vue(),
            vueJsx()
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'packages'),
                'site-pro': resolve(__dirname, 'packages')
            }
        },
        define: {
            '__SITE_VERSION__': `'${version}'`
        }
    }
})
