import type { ComputedRef, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, Fragment, unref } from 'vue'
import { Checkbox as AntCheckbox } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { isUndefined } from 'lodash-es'
import { optionsToValueEnum, valueEnumToOptions, valueEnumToText } from '../../valueEnum'
import type { BaseFieldOption, BaseFieldValueEnum } from '../../typings'
import type { FieldCheckboxFieldProps, FieldCheckboxSlots } from './typings'
import { fieldCheckboxProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldCheckbox',
    props: fieldCheckboxProps(),
    slots: Object as SlotsType<FieldCheckboxSlots>,
    setup (props, { slots }) {
        const sOptions: ComputedRef<BaseFieldOption[]> = computed(() => {
            if (isUndefined(props.valueEnum)) {
                return (props.options || []) as BaseFieldOption[]
            }
            return valueEnumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, options, valueEnum, fieldProps } = props

            if (mode === 'read') {
                const optionsValueEnum: BaseFieldValueEnum = optionsToValueEnum(options as any)
                const valueText: VNodeChild = valueEnumToText(text, valueEnum || optionsValueEnum)

                const readDom: VNodeChild = <Fragment>{valueText ?? emptyText}</Fragment>
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldCheckboxFieldProps = {
                options: unref(sOptions) as any,
                ...fieldProps
            }
            const editDom: VNodeChild = <AntCheckbox.Group {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
