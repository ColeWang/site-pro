import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment, unref } from 'vue'
import { Select as AntSelect } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import useFieldFetchData from '../../hooks/useFieldFetchData'
import { optionsToValueEnum, valueEnumToText } from '../../valueEnum'
import type { BaseFieldValueEnum } from '../../typings'
import type { FieldSelectFieldProps, FieldSelectSlots } from './typings'
import { fieldSelectProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldSelect',
    props: fieldSelectProps(),
    slots: Object as SlotsType<FieldSelectSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])
        const { search, loading, options } = useFieldFetchData(props.request, props)

        // const options: ComputedRef<BaseOptionType[]> = computed(() => {
        //     if (isUndefined(props.valueEnum)) {
        //         return (props.fieldProps.options || []) as BaseOptionType[]
        //     }
        //     return enumToOptions(props.valueEnum)
        // })

        function fetchData (value: string): void {
            search.value = value
        }

        function onSearch (value: string): void {
            console.log(value)
        }

        function onChange (value: string): void {
            console.log('onChange', value)
        }

        function onClear () {

        }

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props

            const placeholder: string = fieldProps.placeholder || t('selectPlaceholder')!

            if (mode === 'read') {
                const { options: propsOptions } = fieldProps

                const optionsValueEnum: BaseFieldValueEnum = optionsToValueEnum(propsOptions as any)
                const valueText: VNodeChild = valueEnumToText(text, valueEnum || optionsValueEnum)

                const readDom: VNodeChild = <Fragment>{valueText ?? emptyText}</Fragment>
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldSelectFieldProps = {
                searchValue: unref(search),
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
