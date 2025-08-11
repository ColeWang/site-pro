import type { UserConfig } from 'vitepress'
import { defineConfig } from 'vitepress'
import viteConfig from './vite-config'
import markdownConfig from './markdown-config'
import nav from './nav'
import sidebar from './sidebar'

export default defineConfig({
    vite: viteConfig as UserConfig,
    markdown: { config: markdownConfig },
    base: '/site-pro/',
    appearance: false,
    title: 'Site Pro',
    description: '中后台重型组件',
    themeConfig: {
        nav: nav,
        sidebar: sidebar
    }
})
