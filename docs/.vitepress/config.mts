import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    vite: {
        plugins: [
            vueJsx()
        ]
    },
    title: 'My Awesome Project',
    description: 'A VitePress Site',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' }
        ],
        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
