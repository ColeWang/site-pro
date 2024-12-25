import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { InputNumber } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getPropsSlotVNode, getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale'
import type { FieldNumberFieldProps, FieldNumberSlots } from './typings'
import { fieldNumberProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldNumber',
    props: fieldNumberProps(),
    slots: Object as SlotsType<FieldNumberSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder: string = fieldProps.placeholder || t('inputPlaceholder')!

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
            const needFieldProps: FieldNumberFieldProps = {
                min: 0,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom: VNodeChild = <InputNumber {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotProps)

            return renderFieldDom || fieldDom
        }
    }
})
