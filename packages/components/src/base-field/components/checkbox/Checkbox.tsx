import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment, unref } from 'vue'
import { Checkbox as AntCheckbox } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import useBaseFieldOptions from '../../hooks/useBaseFieldOptions'
import { baseFieldParsingText } from '../../utils'
import type { FieldCheckboxFieldProps, FieldCheckboxSlots } from './typings'
import { fieldCheckboxProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldCheckbox',
    props: fieldCheckboxProps(),
    slots: Object as SlotsType<FieldCheckboxSlots>,
    setup (props, { slots }) {
        const { options, valueEnum } = useBaseFieldOptions(props.request, props)

        return () => {
            const { mode, text, emptyText, fieldProps } = props

            if (mode === 'read') {
                const valueText: VNodeChild = baseFieldParsingText(text, unref(valueEnum))

                const readDom: VNodeChild = <Fragment>{valueText ?? emptyText}</Fragment>
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldCheckboxFieldProps = {
                options: unref(options) as any,
                ...fieldProps
            }
            const editDom: VNodeChild = <AntCheckbox.Group {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
