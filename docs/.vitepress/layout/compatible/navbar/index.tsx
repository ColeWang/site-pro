import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { getElement } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import HamburgerOutlined from './HamburgerOutlined'
import { navbarProps } from './typings'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLayoutNavbar',
    props: navbarProps(),
    emits: ['update:open'],
    setup (props, { emit, attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-navbar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const popupContainer: Ref<HTMLElement | null> = ref(null)

        function onOpen (): void {
            emit('update:open', true)
        }

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        return () => {
            const { open } = props

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-content`}>
                                <div class={`${prefixCls.value}-left`}>
                                    <div class={`${prefixCls.value}-menu`} onClick={onOpen}>
                                        <HamburgerOutlined/>
                                    </div>
                                </div>
                                <div class={`${prefixCls.value}-right`}></div>
                            </div>
                        </div>
                    </ConfigProvider>
                </div>
            )
        }
    }
})
