import type { App } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { TimeRangePicker } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale-provider'
import type { CustomFormat } from '../../../vue-tools'
import { formatDate } from '../../../vue-tools'
import type { FieldTimeRangePickerFieldProps, FieldTimeRangePickerSlots } from './typings'
import { fieldTimeRangePickerProps } from './typings'

const FieldTimeRangePicker = defineComponent({
    inheritAttrs: false,
    name: 'ProFieldTimeRangePicker',
    props: fieldTimeRangePickerProps(),
    slots: Object as FieldTimeRangePickerSlots,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || [t('selectPlaceholder'), t('selectPlaceholder')]

            if (mode === 'read') {
                const [startText, endText] = isArray(text) ? text : []
                const valueStartText = formatDate(startText, fieldProps.format as CustomFormat)
                const valueEndText = formatDate(endText, fieldProps.format as CustomFormat)
                return (
                    <Fragment>
                        {valueStartText ?? emptyText}
                        {'~'}
                        {valueEndText ?? emptyText}
                    </Fragment>
                )
            }
            const needFieldProps: FieldTimeRangePickerFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder as any
            }
            const fieldDom = <TimeRangePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldTimeRangePicker.install = function (app: App): App {
    app.component(FieldTimeRangePicker.name as string, FieldTimeRangePicker)
    return app
}

export default FieldTimeRangePicker
