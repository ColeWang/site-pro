import type { ComputedRef, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, Fragment, unref } from 'vue'
import { Select as AntSelect } from 'ant-design-vue'
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

                const readDom: VNodeChild = <Fragment>{valueText ?? emptyText}</Fragment>
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldSelectFieldProps = {
                options: unref(options),
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <AntSelect {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
