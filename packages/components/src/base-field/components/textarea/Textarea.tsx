import type { App, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Input, theme } from 'ant-design-vue'
import { getSlotVNode, toPx } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldTextareaFieldProps, FieldTextareaSlots } from './typings'
import { fieldTextareaProps } from './typings'

const FieldTextarea = defineComponent({
    inheritAttrs: false,
    name: 'ProFieldTextarea',
    props: fieldTextareaProps(),
    slots: Object as SlotsType<FieldTextareaSlots>,
    setup (props, { slots }) {
        const { prefixCls } = useConfigInject('pro-field-textarea', props)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { fontSize, colorText, lineHeight, sizeXXS, sizeSM } = unref(token)
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                const styles = {
                    display: 'inline-block',
                    fontSize: toPx(fontSize),
                    color: colorText,
                    lineHeight: lineHeight,
                    paddingBlock: toPx(sizeXXS),
                    paddingInline: toPx(sizeSM),
                    maxWidth: '100%',
                    whiteSpace: 'pre-wrap',
                }
                return (
                    <span class={`${prefixCls.value}__read`} style={styles}>
                        {text ?? emptyText}
                    </span>
                )
            }
            const needFieldProps: FieldTextareaFieldProps = {
                rows: 3,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom = <Input.TextArea {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldTextarea.install = function (app: App): App {
    app.component(FieldTextarea.name as string, FieldTextarea)
    return app
}

export default FieldTextarea
