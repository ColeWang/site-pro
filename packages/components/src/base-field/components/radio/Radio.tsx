import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment, unref } from 'vue'
import { Radio as AntRadio } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import useBaseFieldOptions from '../../hooks/useBaseFieldOptions'
import { baseFieldParsingText } from '../../utils'
import type { FieldRadioFieldProps, FieldRadioSlots } from './typings'
import { fieldRadioProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldRadio',
    props: fieldRadioProps(),
    slots: Object as SlotsType<FieldRadioSlots>,
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
            const needFieldProps: FieldRadioFieldProps = {
                options: unref(options) as any,
                ...fieldProps
            }
            const editDom: VNodeChild = <AntRadio.Group {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
