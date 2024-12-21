import type { App, SlotsType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { TimePicker } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldTimePickerFieldProps, FieldTimePickerSlots } from './typings'
import { fieldTimePickerProps } from './typings'
import type { Format } from '../share-utils'
import { formatDate } from '../share-utils'

const FieldTimePicker = defineComponent({
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
                return valueText ?? emptyText
            }
            const needFieldProps: FieldTimePickerFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom: VNodeChild = <TimePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldTimePicker.install = function (app: App): App {
    app.component(FieldTimePicker.name as string, FieldTimePicker)
    return app
}

export default FieldTimePicker
