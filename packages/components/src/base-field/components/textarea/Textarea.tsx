import type { CSSProperties, SlotsType, VNodeChild } from 'vue'
import { defineComponent, unref } from 'vue'
import { Input as AntInput, theme as antTheme } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode, toPx } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldTextareaFieldProps, FieldTextareaSlots } from './typings'
import { fieldTextareaProps } from './typings'

export default defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProFieldTextarea',
    props: fieldTextareaProps(),
    slots: Object as SlotsType<FieldTextareaSlots>,
    setup (props, { slots }) {
        const { prefixCls } = useConfigInject('pro-field-textarea', props)
        const { token } = antTheme.useToken()
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { fontSize, colorText, lineHeight, sizeXXS, sizeSM } = unref(token)

            const placeholder: string | number = fieldProps.placeholder || t('inputPlaceholder')!

            if (mode === 'read') {
                const styles: CSSProperties = {
                    display: 'inline-block',
                    fontSize: toPx(fontSize),
                    color: colorText,
                    lineHeight: lineHeight,
                    paddingBlock: toPx(sizeXXS),
                    paddingInline: toPx(sizeSM),
                    maxWidth: '100%',
                    whiteSpace: 'pre-wrap',
                }

                const readDom: VNodeChild = (
                    <span class={`${prefixCls.value}__read`} style={styles}>
                        {text ?? emptyText}
                    </span>
                )
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldTextareaFieldProps = {
                rows: 3,
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <AntInput.TextArea {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
