import { defineComponent } from 'vue'
import { DatePicker } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import { fieldDatePickerProps } from './typings'
import type { CustomFormat } from '../utils'
import { formatDate } from '../utils'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldDatePicker',
    props: fieldDatePickerProps(),
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')

            if (mode === 'read') {
                const valueText = formatDate(text, fieldProps.format as CustomFormat)
                return valueText ?? emptyText
            }
            const needFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom = <DatePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
