import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { dirname, extname, relative, resolve } from 'path'
import { sync as globSync } from 'glob'
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

function readChunksEntry (fileNames: string[], root: string) {
    const pairs: Array<string[]> = fileNames.map((name) => {
        const path: string = name.slice(0, name.length - extname(name).length)
        return [
            relative(root, path),
            fileURLToPath(new URL(name, import.meta.url))
        ]
    })
    return Object.fromEntries(pairs)
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
                '@': resolve(__dirname, './examples'),
                '@site-pro/utils': resolve(__dirname, './src')
            }
        },
        build: {
            minify: false,
            lib: {
                entry: readChunksEntry(globSync('./src/**/*.{ts,tsx}', {
                    ignore: ['**/demos/**']
                }), 'src')
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
                        entryFileNames: '[name].js'
                    },
                    {
                        format: 'cjs',
                        dir: 'lib',
                        exports: 'named',
                        entryFileNames: '[name].js',
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
