import type { App, SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { TimeRangePicker } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale'
import type { FieldTimeRangePickerFieldProps, FieldTimeRangePickerSlots } from './typings'
import { fieldTimeRangePickerProps } from './typings'
import type { Format } from '../share-utils'
import { formatDate } from '../share-utils'

const FieldTimeRangePicker = defineComponent({
    inheritAttrs: false,
    name: 'ProFieldTimeRangePicker',
    props: fieldTimeRangePickerProps(),
    slots: Object as SlotsType<FieldTimeRangePickerSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder: [string, string] = fieldProps.placeholder|| [t('selectPlaceholder')!, t('selectPlaceholder')!]

            if (mode === 'read') {
                const [startText, endText] = isArray(text) ? text : []
                const valueStartText: VNodeChild = formatDate(startText, fieldProps.format as Format)
                const valueEndText: VNodeChild = formatDate(endText, fieldProps.format as Format)
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
                placeholder: placeholder
            }
            const fieldDom: VNodeChild = <TimeRangePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldTimeRangePicker.install = function (app: App): App {
    app.component(FieldTimeRangePicker.name as string, FieldTimeRangePicker)
    return app
}

export default FieldTimeRangePicker
