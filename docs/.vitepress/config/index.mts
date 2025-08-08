import { defineConfig } from 'vitepress'
import viteConfig from './vite'

export default defineConfig({
    vite: viteConfig(),
    base: '/site-pro/',
    appearance: false,
    title: 'SitePro',
    description: '中后台重型组件',
    themeConfig: {
        nav: [
            { text: '指南', link: '/guide/introduce' },
            { text: '组件', link: '/components/form' },
            { text: '插件', link: '/plugins/screen' },
        ],
        sidebar: {
            '/guide': [
                {
                    text: '指南',
                    items: [
                        {
                            text: '介绍',
                            link: '/guide/introduce'
                        },
                        {
                            text: '快速上手',
                            link: '/guide/quickstart'
                        },
                        {
                            text: '定制主题',
                            link: '/guide/theming'
                        },
                        {
                            text: '国际化',
                            link: '/guide/i18n'
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
                            link: '/components/locale-provider'
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
                    text: '屏幕插件',
                    items: [
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
                {
                    text: '加载插件',
                    items: [
                        {
                            text: 'Loading - 加载',
                            link: '/plugins/loading'
                        },
                        {
                            text: 'Progress - 进度',
                            link: '/plugins/progress'
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
