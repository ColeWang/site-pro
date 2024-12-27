import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { InputNumber as AntInputNumber } from 'ant-design-vue'
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
                const prefix: VNodeChild = getPropsSlotVNode(slots, fieldProps, 'prefix')
                const suffix: VNodeChild = getPropsSlotVNode(slots, fieldProps, 'suffix')

                const readDom: VNodeChild = (
                    <Fragment>
                        {prefix}
                        {text ?? emptyText}
                        {suffix}
                    </Fragment>
                )
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldNumberFieldProps = {
                min: 0,
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <AntInputNumber {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
