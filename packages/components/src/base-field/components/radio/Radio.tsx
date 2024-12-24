import type { ComputedRef, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import { Radio } from 'ant-design-vue'
import type { BaseEnumType, BaseOptionType } from '@site-pro/utils'
import { enumToOptions, enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { isUndefined } from 'lodash-es'
import type { FieldRadioFieldProps, FieldRadioSlots } from './typings'
import { fieldRadioProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldRadio',
    props: fieldRadioProps(),
    slots: Object as SlotsType<FieldRadioSlots>,
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
                const optionsValueEnum: BaseEnumType = optionsToEnum(propsOptions as any)
                const valueText: VNodeChild = enumToText(text, valueEnum || optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps: FieldRadioFieldProps = {
                options: unref(options) as any,
                ...fieldProps
            }
            const fieldDom: VNodeChild = <Radio.Group {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
