import { defineComponent, Fragment } from 'vue'
import { RangePicker } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale-provider'
import { fieldRangePickerProps } from './typings'
import type { CustomFormat } from '../utils'
import { formatDate } from '../utils'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldRangePicker',
    props: fieldRangePickerProps(),
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
            const needFieldProps: any = {
                allowClear: true,
                ...fieldProps,
                // -- placeholder 类型有问题 string | [string, string]
                placeholder: placeholder
            }
            const fieldDom = <RangePicker {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope = { props: props, slots: slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
