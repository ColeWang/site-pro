import type { App, SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { RangePicker } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale'
import type { FieldRangePickerFieldProps, FieldRangePickerSlots } from './typings'
import { fieldRangePickerProps } from './typings'
import type { Format } from '../share-utils'
import { formatDate } from '../share-utils'

const FieldRangePicker = defineComponent({
    inheritAttrs: false,
    name: 'ProFieldRangePicker',
    props: fieldRangePickerProps(),
    slots: Object as SlotsType<FieldRangePickerSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder: [string, string] = fieldProps.placeholder || [t('selectPlaceholder')!, t('selectPlaceholder')!]

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
            const needFieldProps: FieldRangePickerFieldProps & any = {
                allowClear: true,
                ...fieldProps,
                // -- placeholder 类型有问题 string | [string, string]
                placeholder: placeholder
            }
            const fieldDom: VNodeChild = <RangePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldRangePicker.install = function (app: App): App {
    app.component(FieldRangePicker.name as string, FieldRangePicker)
    return app
}

export default FieldRangePicker
