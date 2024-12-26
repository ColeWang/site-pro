import type { Ref, SlotsType } from 'vue'
import { defineComponent, ref } from 'vue'
import { ConfigProvider as AntConfigProvider } from 'ant-design-vue'
import { getElement } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import type { ExtraSlots } from './typings'
import { extraProps } from './typings'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableExtra',
    props: extraProps(),
    slots: Object as SlotsType<ExtraSlots>,
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-extra', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const popupContainer: Ref<HTMLElement | null> = ref(null)

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <AntConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-container`}>
                                {slots.default && slots.default()}
                            </div>
                        </div>
                    </AntConfigProvider>
                </div>
            )
        }
    }
})
