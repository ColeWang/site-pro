import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { TimeRangePicker } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale'
import type { FieldTimeRangePickerFieldProps, FieldTimeRangePickerSlots } from './typings'
import { fieldTimeRangePickerProps } from './typings'
import type { Format } from '../share-utils'
import { formatDate } from '../share-utils'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldTimeRangePicker',
    props: fieldTimeRangePickerProps(),
    slots: Object as SlotsType<FieldTimeRangePickerSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder: [string, string] = fieldProps.placeholder || [t('selectPlaceholder')!, t('selectPlaceholder')!]

            if (mode === 'read') {
                const [startText, endText] = isArray(text) ? text : [text, text]

                const valueStartText: VNodeChild = formatDate(startText, fieldProps.format as Format)
                const valueEndText: VNodeChild = formatDate(endText, fieldProps.format as Format)

                const readDom: VNodeChild = (
                    <Fragment>
                        {valueStartText ?? emptyText}
                        {'~'}
                        {valueEndText ?? emptyText}
                    </Fragment>
                )
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldTimeRangePickerFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <TimeRangePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
