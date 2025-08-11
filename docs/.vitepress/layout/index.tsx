import { defineComponent, unref } from 'vue'
import { useData } from 'vitepress'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import BaseLayout from './compatible/base-layout'
import Sidebar from './compatible/sidebar'
import Navbar from './compatible/navbar'
import Container from './compatible/container'
import Home from './home'
import './css/reset.css'

export default defineComponent({
    inheritAttrs: false,
    setup (_, { attrs }) {
        const { site, frontmatter } = useData()

        function onChange (close) {
            return function (name) {
                console.log(name)
            }
        }

        return () => {
            const { layout, ...restProps } = unref(frontmatter)

            if (layout === 'home') {
                return (
                    <Home {...restProps}/>
                )
            }

            const layoutSlots: Recordable<BaseSlot> = {
                sider: ({ styleFn, onClose }) => {
                    return (
                        <Sidebar
                            logo={() => 'logo'}
                            menus={site.value.themeConfig.sidebar['/components']}
                            styleFn={styleFn}
                            onChange={onChange(onClose)}
                        />
                    )
                },
                header: ({ open, onUpdateOpen }) => {
                    return (
                        <Navbar open={open} onUpdate:open={onUpdateOpen}/>
                    )
                },
                content: () => <Container/>
            }

            return (
                <BaseLayout {...attrs} v-slots={layoutSlots}/>
            )
        }
    }
})
