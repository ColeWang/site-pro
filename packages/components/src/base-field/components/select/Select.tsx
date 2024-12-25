import type { ComputedRef, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import { Select } from 'ant-design-vue'
import type { BaseEnumType, BaseOptionType, Recordable } from '@site-pro/utils'
import { enumToOptions, enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { isUndefined } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale'
import type { FieldSelectFieldProps, FieldSelectSlots } from './typings'
import { fieldSelectProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldSelect',
    props: fieldSelectProps(),
    slots: Object as SlotsType<FieldSelectSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        const options: ComputedRef<BaseOptionType[]> = computed(() => {
            if (isUndefined(props.valueEnum)) {
                return (props.fieldProps.options || []) as BaseOptionType[]
            }
            return enumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props
            const placeholder: string = fieldProps.placeholder || t('selectPlaceholder')!

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum: BaseEnumType = optionsToEnum(propsOptions as any, fieldNames)
                const valueText: VNodeChild = enumToText(text, valueEnum || optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps: FieldSelectFieldProps = {
                options: unref(options),
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom: VNodeChild = <Select {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotProps)

            return renderFieldDom || fieldDom
        }
    }
})
