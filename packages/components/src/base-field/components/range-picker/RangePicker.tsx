import { defineComponent, Fragment } from 'vue'
import { RangePicker } from 'ant-design-vue'
import { useLocaleReceiver } from '../../../locale-provider'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import { fieldRangePickerProps } from './typings'
import type { RangePickerProps } from '../../typings'
import { formatDate } from '../utils'

export default defineComponent({
    inheritAttrs: false,
    props: fieldRangePickerProps(),
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || [t('selectPlaceholder'), t('selectPlaceholder')]

            if (mode === 'read') {
                const [startText, endText] = isArray(text) ? text : []
                const valueStartText = formatDate(startText, fieldProps.format)
                const valueEndText = formatDate(endText, fieldProps.format)
                return (
                    <Fragment>
                        {valueStartText ?? emptyText}
                        {'~'}
                        {valueEndText ?? emptyText}
                    </Fragment>
                )
            }
            const needFieldProps: RangePickerProps & any = {
                allowClear: true,
                ...fieldProps,
                // -- placeholder 类型有问题 string | [string, string]
                placeholder: placeholder
            }
            const dom = <RangePicker {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
