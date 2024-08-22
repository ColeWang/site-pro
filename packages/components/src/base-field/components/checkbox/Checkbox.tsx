import { computed, defineComponent, unref } from 'vue'
import { Checkbox } from 'ant-design-vue'
import type { BaseTextType } from '@site-pro/utils'
import { optionsToValueEnum, valueEnumToOptions, valueEnumToText, getSlotVNode } from '@site-pro/utils'
import { baseFieldProps } from '../../typings.ts'
import { isUndefined } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const options = computed(() => {
            if (isUndefined(props.valueEnum)) {
                return props.fieldProps.options || []
            }
            return valueEnumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToValueEnum(propsOptions, fieldNames)
                const valueText = valueEnumToText(text as BaseTextType, valueEnum || optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps = {
                options: unref(options),
                ...fieldProps
            }
            const dom = <Checkbox.Group {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
