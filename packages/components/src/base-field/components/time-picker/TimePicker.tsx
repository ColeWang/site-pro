import type { App } from 'vue'
import { defineComponent } from 'vue'
import { TimePicker } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import type { CustomFormat } from '../../../vue-tools'
import { formatDate } from '../../../vue-tools'
import type { FieldTimePickerFieldProps, FieldTimePickerSlots } from './typings'
import { fieldTimePickerProps } from './typings'

const FieldTimePicker = defineComponent({
    inheritAttrs: false,
    name: 'ProFieldTimePicker',
    props: fieldTimePickerProps(),
    slots: Object as FieldTimePickerSlots,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')

            if (mode === 'read') {
                const valueText = formatDate(text, fieldProps.format as CustomFormat)
                return valueText ?? emptyText
            }
            const needFieldProps: FieldTimePickerFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder as any
            }
            const fieldDom = <TimePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldTimePicker.install = function (app: App): App {
    app.component(FieldTimePicker.name as string, FieldTimePicker)
    return app
}

export default FieldTimePicker
