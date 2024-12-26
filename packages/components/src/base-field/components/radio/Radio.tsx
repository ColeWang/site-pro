import type { ComputedRef, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, Fragment, unref } from 'vue'
import { Radio as AntRadio } from 'ant-design-vue'
import type { BaseEnumType, BaseOptionType, Recordable } from '@site-pro/utils'
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

                const readDom: VNodeChild = <Fragment>{valueText ?? emptyText}</Fragment>
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldRadioFieldProps = {
                options: unref(options) as any,
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
