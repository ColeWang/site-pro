import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment, ref, unref } from 'vue'
import { ConfigProvider as AntConfigProvider, Space as AntSpace, theme as antTheme } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getElement, getSlotVNode } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { useLocaleReceiver } from '../../../locale-provider'
import { Action } from '../../../action'
import type { AlertSlots } from './typings'
import { alertProps } from './typings'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableAlert',
    props: alertProps(),
    slots: Object as SlotsType<AlertSlots>,
    emits: ['cleanSelected'],
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-alert', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = antTheme.useToken()
        const { t } = useLocaleReceiver(['Table', 'alert'])

        const popupContainer = ref(null)

        function onCleanSelected (): void {
            emit('cleanSelected')
        }

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        return () => {
            const { selectedRowKeys, selectedRows } = props
            const { sizeMS } = unref(token)

            if (selectedRowKeys.length < 1) return null

            const contentText: string = `${t('selected')} ${selectedRowKeys.length} ${t('item')}`
            const defaultContent: VNodeChild = (
                <AntSpace size={sizeMS / 2}>
                    <Fragment>{contentText}</Fragment>
                    <Action onClick={onCleanSelected}>
                        {t('clear')}
                    </Action>
                </AntSpace>
            )

            const slotProps: Recordable = {
                keys: selectedRowKeys,
                rows: selectedRows,
                cleanSelected: onCleanSelected
            }

            const optionsDom: VNodeChild = getSlotVNode(slots, props, 'options', slotProps)

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <AntConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-container`}>
                                <div class={`${prefixCls.value}-wrapper`}>
                                    <div class={`${prefixCls.value}-content`}>
                                        {slots.default ? slots.default(slotProps) : defaultContent}
                                    </div>
                                    <div class={`${prefixCls.value}-options`}>
                                        {optionsDom}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AntConfigProvider>
                </div>
            )
        }
    }
})
