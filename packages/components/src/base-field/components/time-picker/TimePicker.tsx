import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { TimePicker } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale'
import type { FieldTimePickerFieldProps, FieldTimePickerSlots } from './typings'
import { fieldTimePickerProps } from './typings'
import type { Format } from '../share-utils'
import { formatDate } from '../share-utils'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldTimePicker',
    props: fieldTimePickerProps(),
    slots: Object as SlotsType<FieldTimePickerSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder: string = fieldProps.placeholder || t('selectPlaceholder')!

            if (mode === 'read') {
                const valueText: VNodeChild = formatDate(text, fieldProps.format as Format)

                const readDom: VNodeChild = <Fragment>{valueText ?? emptyText}</Fragment>
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldTimePickerFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <TimePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
