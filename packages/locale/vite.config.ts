import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
// --
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

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
            vueJsx(),
            dts({
                tsconfigPath: './tsconfig.dts.json',
                outDir: 'types'
            })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'examples')
            }
        },
        build: {
            target: 'modules',
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
                        format: 'es',
                        dir: 'es',
                        exports: 'named',
                        entryFileNames: '[name].js',
                        preserveModules: true,
                        preserveModulesRoot: 'src'
                    },
                    {
                        format: 'cjs',
                        dir: 'lib',
                        exports: 'named',
                        entryFileNames: '[name].js',
                        preserveModules: true,
                        preserveModulesRoot: 'src',
                        paths: replacePaths
                    }
                ]
            }
        },
        define: {
            '__VERSION__': `'${version}'`
        }
    }
})
