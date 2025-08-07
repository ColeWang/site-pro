import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { RangePicker as AntRangePicker } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldRangePickerFieldProps, FieldRangePickerSlots } from './typings'
import { fieldRangePickerProps } from './typings'
import { dateFormat } from '../date-utils'

export default defineComponent({
    compatConfig: { MODE: 3 },
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
                const [startText, endText] = isArray(text) ? text : [text, text]

                const valueStartText: VNodeChild = dateFormat(startText, fieldProps.format)
                const valueEndText: VNodeChild = dateFormat(endText, fieldProps.format)

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
            const needFieldProps: FieldRangePickerFieldProps & any = {
                allowClear: true,
                ...fieldProps,
                // -- placeholder 类型有问题 string | [string, string]
                placeholder: placeholder
            }
            const editDom: VNodeChild = <AntRangePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
