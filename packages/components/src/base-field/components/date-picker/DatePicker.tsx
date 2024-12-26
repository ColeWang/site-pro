import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { DatePicker as AntDatePicker } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale'
import type { FieldDatePickerFieldProps, FieldDatePickerSlots } from './typings'
import { fieldDatePickerProps } from './typings'
import type { Format } from '../share-utils'
import { formatDate } from '../share-utils'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldDatePicker',
    props: fieldDatePickerProps(),
    slots: Object as SlotsType<FieldDatePickerSlots>,
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
            const needFieldProps: FieldDatePickerFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <AntDatePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
