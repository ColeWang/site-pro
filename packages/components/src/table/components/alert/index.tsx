import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent, Fragment, ref, unref } from 'vue'
import { ConfigProvider, Space, theme } from 'ant-design-vue'
import type { BaseSlot } from '@site-pro/utils'
import { getElement, getSlotVNode } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { Action } from '../../../action'
import { useLocaleReceiver } from '../../../locale-provider'
import useStyle from './style'

export const alertProps = () => ({
    selectedRowKeys: {
        type: Array as PropType<(string | number)[]>,
        default: () => ([])
    },
    selectedRows: {
        type: Array as PropType<any[]>,
        default: () => ([])
    },
    options: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    onCleanSelected: {
        type: Function as PropType<() => void>,
        default: undefined
    }
})

export type AlertProps = Partial<ExtractPropTypes<ReturnType<typeof alertProps>>>;
export type AlertInstance = ComponentPublicInstance<AlertProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableAlert',
    props: alertProps(),
    emits: ['cleanSelected'],
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-alert', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'alert'])

        const popupContainer = ref(null)

        function onCleanSelected (): void {
            emit('cleanSelected')
        }

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        return () => {
            if (props.selectedRowKeys.length < 1) return null
            // ----
            const { selectedRowKeys, selectedRows } = props
            const { sizeMS } = unref(token)

            const contentText: string = `${t('selected')} ${selectedRowKeys.length} ${t('item')}`
            const defaultContent = (
                <Space size={sizeMS / 2}>
                    <Fragment>{contentText}</Fragment>
                    <Action onClick={onCleanSelected}>
                        {t('clear')}
                    </Action>
                </Space>
            )

            const slotScope: any = {
                keys: selectedRowKeys,
                rows: selectedRows,
                cleanSelected: onCleanSelected
            }

            const customContent = getSlotVNode(slots, props, 'default', slotScope)
            const optionsDom = getSlotVNode(slots, props, 'options', slotScope)

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-container`}>
                                <div class={`${prefixCls.value}-wrapper`}>
                                    <div class={`${prefixCls.value}-content`}>
                                        {customContent || defaultContent}
                                    </div>
                                    <div class={`${prefixCls.value}-options`}>
                                        {optionsDom}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ConfigProvider>
                </div>
            )
        }
    }
})
