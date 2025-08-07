import type { Ref, SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment, ref, unref } from 'vue'
import { Select as AntSelect } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import useBaseFieldOptions from '../../hooks/useBaseFieldOptions'
import { baseFieldParsingText } from '../../utils'
import type { FieldSelectFieldProps, FieldSelectSlots } from './typings'
import { fieldSelectProps } from './typings'

export default defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProFieldSelect',
    props: fieldSelectProps(),
    slots: Object as SlotsType<FieldSelectSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])
        const { loading, options, valueEnum, fetchData } = useBaseFieldOptions(props.request, props)

        const searchValue: Ref<string> = ref('')

        // 初始化请求
        props.request && fetchData()

        function onSearch (value: string): void {
            // fieldProps 扩展 fetchDataOnSearch
            if (props.fieldProps.fetchDataOnSearch) {
                fetchData(value)
            }
            searchValue.value = value
        }

        function onChange (value: any, option: any): void {
            if (props.fieldProps.showSearch && props.fieldProps.autoClearSearchValue) {
                onSearch('')
            }
            props.fieldProps.onChange && props.fieldProps.onChange(value, option)
        }

        function onClear (): void {
            if (props.fieldProps.showSearch) {
                onSearch('')
            }
            props.fieldProps.onClear && props.fieldProps.onClear()
        }

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
            const needFieldProps: FieldSelectFieldProps = {
                searchValue: unref(searchValue),
                loading: unref(loading),
                options: unref(options),
                allowClear: true,
                onSearch: fieldProps.showSearch ? onSearch : undefined,
                onChange: onChange,
                onClear: onClear,
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
