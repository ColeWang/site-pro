import type { ComputedRef } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import { Radio } from 'ant-design-vue'
import type { BaseOptionType } from '@site-pro/utils'
import { enumToOptions, enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { isUndefined } from 'lodash-es'
import { fieldRadioProps } from './typings'
import type { RadioGroupProps } from '../../../ant-typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldRadio',
    props: fieldRadioProps(),
    setup (props, { slots }) {
        const options: ComputedRef<BaseOptionType[]> = computed(() => {
            if (isUndefined(props.valueEnum)) {
                return (props.fieldProps.options || []) as BaseOptionType[]
            }
            return enumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props

            if (mode === 'read') {
                const { options: propsOptions } = fieldProps
                const optionsValueEnum = optionsToEnum(propsOptions as any)
                const valueText = enumToText(text, valueEnum || optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps: RadioGroupProps = {
                options: unref(options) as any,
                ...fieldProps
            }
            const fieldDom = <Radio.Group {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
