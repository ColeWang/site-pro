import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment, unref } from 'vue'
import { Cascader as AntCascader } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import useBaseFieldOptions from '../../hooks/useBaseFieldOptions'
import { baseFieldParsingText } from '../../utils'
import type { FieldCascaderFieldProps, FieldCascaderSlots } from './typings'
import { fieldCascaderProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldCascader',
    props: fieldCascaderProps(),
    slots: Object as SlotsType<FieldCascaderSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])
        const { options, valueEnum } = useBaseFieldOptions(props.request, props)

        return () => {
            const { mode, text, emptyText, fieldProps } = props

            const placeholder: string = fieldProps.placeholder || t('selectPlaceholder')!

            if (mode === 'read') {
                const valueText: VNodeChild = baseFieldParsingText(text, unref(valueEnum))

                const readDom: VNodeChild = <Fragment>{valueText ?? emptyText}</Fragment>
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldCascaderFieldProps = {
                allowClear: true,
                options: unref(options),
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <AntCascader {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
