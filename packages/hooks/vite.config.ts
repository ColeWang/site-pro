import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
// --
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import typescript from '@rollup/plugin-typescript'

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = dirname(__filename)

function readPackageFile (): Record<string, any> {
    const urlPath: URL = new URL('./package.json', import.meta.url)
    const file: string = readFileSync(urlPath, 'utf-8')
    return JSON.parse(file)
}

function replacePaths (id: string): string {
    const regExp: RegExp = /(ant-design-vue)\/(es)\/(.*)/
    if (id && regExp.test(id)) {
        return id.replace(regExp, '$1/lib/$3')
    }
    return id
}

export default defineConfig((config) => {
    const env: Record<string, string> = loadEnv(config.mode, __dirname, ['VITE_', 'ENV_'])

    console.log(env)

    const { version } = readPackageFile()

    return {
        plugins: [
            vue(),
            vueJsx()
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'examples')
            }
        },
        build: {
            minify: false,
            lib: {
                entry: resolve(__dirname, 'src')
            },
            rollupOptions: {
                external: [
                    'vue',
                    'vue-router',
                    'lodash-es',
                    'dayjs',
                    /@ant-design/,
                    /ant-design-vue/,
                    /@site-pro/
                ],
                output: [
                    {
                        entryFileNames: 'index.esm.js',
                        format: 'es'
                    },
                    {
                        entryFileNames: 'index.cjs.js',
                        format: 'cjs',
                        paths: replacePaths
                    }
                ],
                plugins: [
                    typescript({
                        tsconfig: './tsconfig.esm.json',
                        target: 'es2020',
                        emitDeclarationOnly: true,
                    })
                ]
            }
        },
        define: {
            '__VERSION__': `'${version}'`
        }
    }
})
