import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    vite: {
        plugins: [
            vueJsx()
        ]
    },
    base: '/site-pro/',
    appearance: false,
    title: 'SitePro',
    description: '中后台重型组件',
    themeConfig: {
        nav: [
            { text: '指南', link: '/intro/introduce' },
            { text: '组件', link: '/components/form' },
            { text: '插件', link: '/plugins/loading' },
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
                        },
                        {
                            text: 'Fields - 表单项',
                            link: '/components/fields'
                        },
                        {
                            text: 'QueryFilter - 筛选表单',
                            link: '/components/query-filter'
                        },
                        {
                            text: 'Modal/Drawer - 浮层表单',
                            link: '/components/float-form'
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
                    text: '通用',
                    items: [
                        {
                            text: 'ResizeObserver - 屏幕监听',
                            link: '/components/resize-observer'
                        },
                        {
                            text: 'Action - 操作',
                            link: '/components/action'
                        }
                    ]
                },
                {
                    text: '其他',
                    items: [
                        {
                            text: 'Locale - 国际化',
                            link: '/components/locale'
                        },
                        {
                            text: 'Theme - 主题',
                            link: '/components/theme'
                        }
                    ]
                }
            ],
            '/plugins': [
                {
                    text: 'Loading - 加载',
                    link: '/plugins/loading'
                },
                {
                    text: 'Progress - 进度',
                    link: '/plugins/progress'
                },
                {
                    text: 'Screen - 屏幕',
                    link: '/plugins/screen'
                },
                {
                    text: 'Fullscreen - 全屏',
                    link: '/plugins/fullscreen'
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
