import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
// --
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import typescript from '@rollup/plugin-typescript'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function readPackageFile () {
    const urlPath = new URL('./package.json', import.meta.url)
    const file = readFileSync(urlPath, 'utf-8')
    return JSON.parse(file)
}

const { version } = readPackageFile()

export default defineConfig((config) => {
    const env = loadEnv(config.mode, __dirname, ['VITE_', 'ENV_'])

    console.log(env)

    return {
        plugins: [
            vue(),
            vueJsx()
        ],
        resolve: {
            alias: {
                '@site-pro/components': resolve(__dirname, 'src'),
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
                    'ant-design-vue',
                    '@ant-design/icons-vue',
                    '@site-pro/utils',
                    '@site-pro/hooks',
                    '@types/lodash-es',
                    'ant-design-vue/es/theme/internal',
                    'ant-design-vue/es/_util/cssinjs',
                    'ant-design-vue/es/date-picker/generatePicker/props',
                    'ant-design-vue/es/time-picker/time-picker',
                    'ant-design-vue/es/input',
                    'ant-design-vue/es/form',
                    'ant-design-vue/es/grid/Row',
                    'ant-design-vue/es/grid/Col'
                ],
                output: [
                    {
                        entryFileNames: 'index.esm.js',
                        format: 'es',
                        paths: {
                            'ant-design-vue/es/theme/internal': 'ant-design-vue/es/theme/internal',
                            'ant-design-vue/es/_util/cssinjs': 'ant-design-vue/es/_util/cssinjs',
                            'ant-design-vue/es/date-picker/generatePicker/props': 'ant-design-vue/es/date-picker/generatePicker/props',
                            'ant-design-vue/es/time-picker/time-picker': 'ant-design-vue/es/time-picker/time-picker',
                            'ant-design-vue/es/input': 'ant-design-vue/es/input',
                            'ant-design-vue/es/form': 'ant-design-vue/es/form',
                            'ant-design-vue/es/grid/Row': 'ant-design-vue/es/grid/Row',
                            'ant-design-vue/es/grid/Col': 'ant-design-vue/es/grid/Col'
                        }
                    },
                    {
                        entryFileNames: 'index.cjs.js',
                        format: 'cjs',
                        paths: {
                            'ant-design-vue/es/theme/internal': 'ant-design-vue/lib/theme/internal',
                            'ant-design-vue/es/_util/cssinjs': 'ant-design-vue/lib/_util/cssinjs',
                            'ant-design-vue/es/date-picker/generatePicker/props': 'ant-design-vue/lib/date-picker/generatePicker/props',
                            'ant-design-vue/es/time-picker/time-picker': 'ant-design-vue/lib/time-picker/time-picker',
                            'ant-design-vue/es/input': 'ant-design-vue/lib/input',
                            'ant-design-vue/es/form': 'ant-design-vue/lib/form',
                            'ant-design-vue/es/grid/Row': 'ant-design-vue/lib/grid/Row',
                            'ant-design-vue/es/grid/Col': 'ant-design-vue/lib/grid/Col'
                        }
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
