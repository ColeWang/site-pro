import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import type { BaseEnumType, Recordable } from '@site-pro/utils'
import { enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale'
import type { FieldTreeSelectFieldProps, FieldTreeSelectSlots } from './typings'
import { fieldTreeSelectProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldTreeSelect',
    props: fieldTreeSelectProps(),
    slots: Object as SlotsType<FieldTreeSelectSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { options, ...restFieldProps } = fieldProps
            const placeholder: string = fieldProps.placeholder || t('selectPlaceholder')!

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps

                const optionsValueEnum: BaseEnumType = optionsToEnum(propsOptions as any, fieldNames)
                const valueText: VNodeChild = enumToText(text, optionsValueEnum)

                const readDom: VNodeChild = <Fragment>{valueText ?? emptyText}</Fragment>
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldTreeSelectFieldProps = {
                treeData: options as any,
                allowClear: true,
                ...restFieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <TreeSelect {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
