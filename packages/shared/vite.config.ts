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
                '@site-pro/utils': resolve(__dirname, 'src'),
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
                    'ant-design-vue/es/config-provider/hooks/useConfigInject',
                    'ant-design-vue/es/theme/internal'
                ],
                output: [
                    {
                        entryFileNames: 'index.esm.js',
                        format: 'es',
                        paths: {
                            'ant-design-vue/es/config-provider/hooks/useConfigInject': 'ant-design-vue/es/config-provider/hooks/useConfigInject',
                            'ant-design-vue/es/theme/internal': 'ant-design-vue/es/theme/internal'
                        }
                    },
                    {
                        entryFileNames: 'index.cjs.js',
                        format: 'cjs',
                        paths: {
                            'ant-design-vue/es/config-provider/hooks/useConfigInject': 'ant-design-vue/lib/config-provider/hooks/useConfigInject',
                            'ant-design-vue/es/theme/internal': 'ant-design-vue/lib/theme/internal'
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
