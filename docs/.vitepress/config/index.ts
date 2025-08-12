import type { ConfigEnv } from 'vite'
import type { UserConfig } from 'vitepress'
import viteConfig from './vite-config'
import mdPlugin from './md-plugin'
import nav from './nav'
import sidebar from './sidebar'

function defineConfig (config: ConfigEnv): UserConfig {
    return {
        vite: viteConfig(config) as UserConfig,
        markdown: { config: mdPlugin },
        base: '/site-pro/',
        appearance: false,
        title: 'Site Pro',
        description: '中后台重型组件',
        themeConfig: {
            nav: nav,
            sidebar: sidebar
        }
    }
}

export default defineConfig
