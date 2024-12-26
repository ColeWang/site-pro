import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    vite: {
        plugins: [
            vueJsx()
        ]
    },
    base: '/docs/',
    appearance: false,
    title: 'SitePro',
    description: '中后台重型组件',
    themeConfig: {
        nav: [
            { text: '指南', link: '/intro/introduce' },
            { text: '组件', link: '/components/form' }
        ],
        sidebar: {
            '/intro': [
                {
                    text: '指南',
                    items: [
                        {
                            text: '介绍',
                            link: '/intro/introduce'
                        },
                        {
                            text: '快速开始',
                            link: '/intro/started'
                        }
                    ]
                }
            ],
            '/components': [
                {
                    text: '数据录入',
                    items: [
                        {
                            text: 'Form - 高级表单',
                            link: '/components/form'
                        }
                    ]
                },
                {
                    text: '数据展示',
                    items: [
                        {
                            text: 'Table - 高级表格',
                            link: '/components/table'
                        },
                        {
                            text: 'Descriptions - 定义列表',
                            link: '/components/descriptions'
                        }
                    ]
                },
                {
                    text: '其他',
                    items: [
                        {
                            text: 'Action - 操作',
                            link: '/components/action'
                        }
                    ]
                }
            ]
        },
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/ColeWang/site-pro'
            }
        ]
    }
})
