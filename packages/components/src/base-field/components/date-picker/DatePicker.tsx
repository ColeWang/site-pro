import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { DatePicker } from 'ant-design-vue'
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
                return valueText ?? emptyText
            }
            const needFieldProps: FieldDatePickerFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom: VNodeChild = <DatePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
