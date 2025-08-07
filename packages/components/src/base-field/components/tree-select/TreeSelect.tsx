import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment, unref } from 'vue'
import { TreeSelect as AntTreeSelect } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import useBaseFieldOptions from '../../hooks/useBaseFieldOptions'
import { baseFieldParsingText } from '../../utils'
import type { FieldTreeSelectFieldProps, FieldTreeSelectSlots } from './typings'
import { fieldTreeSelectProps } from './typings'

export default defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProFieldTreeSelect',
    props: fieldTreeSelectProps(),
    slots: Object as SlotsType<FieldTreeSelectSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])
        const { loading, options, valueEnum, fetchData } = useBaseFieldOptions(props.request, props)

        // 初始化请求
        props.request && fetchData()

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
            const needFieldProps: FieldTreeSelectFieldProps = {
                loading: unref(loading),
                treeData: unref(options) as any,
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <AntTreeSelect {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
