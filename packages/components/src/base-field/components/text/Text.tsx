import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { Input } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getPropsSlotVNode, getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale'
import type { FieldTextFieldProps, FieldTextSlots } from './typings'
import { fieldTextProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldText',
    props: fieldTextProps(),
    slots: Object as SlotsType<FieldTextSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder: string | number = fieldProps.placeholder || t('inputPlaceholder')!

            if (mode === 'read') {
                const prefixDom: VNodeChild = getPropsSlotVNode(slots, fieldProps, 'prefix')
                const suffixDom: VNodeChild = getPropsSlotVNode(slots, fieldProps, 'suffix')
                return (
                    <Fragment>
                        {prefixDom}
                        {text ?? emptyText}
                        {suffixDom}
                    </Fragment>
                )
            }
            const needFieldProps: FieldTextFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom: VNodeChild = <Input {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotProps)

            return renderFieldDom || fieldDom
        }
    }
})
