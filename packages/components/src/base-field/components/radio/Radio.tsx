import type { ComputedRef, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, Fragment, unref } from 'vue'
import { Radio as AntRadio } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { isUndefined } from 'lodash-es'
import { optionsToValueEnum, valueEnumToOptions, valueEnumToText } from '../../valueEnum'
import type { BaseFieldOption, BaseFieldValueEnum } from '../../typings'
import type { FieldRadioFieldProps, FieldRadioSlots } from './typings'
import { fieldRadioProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldRadio',
    props: fieldRadioProps(),
    slots: Object as SlotsType<FieldRadioSlots>,
    setup (props, { slots }) {
        const sOptions: ComputedRef<BaseFieldOption[]> = computed(() => {
            if (isUndefined(props.valueEnum)) {
                return (props.fieldProps.options || []) as BaseFieldOption[]
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
            const needFieldProps: FieldRadioFieldProps = {
                options: unref(sOptions) as any,
                ...fieldProps
            }
            const editDom: VNodeChild = <AntRadio.Group {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
