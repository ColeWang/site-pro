import type { App, ComputedRef, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import { Select } from 'ant-design-vue'
import type { BaseEnumType, BaseOptionType } from '@site-pro/utils'
import { enumToOptions, enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { isUndefined } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldSelectFieldProps, FieldSelectSlots } from './typings'
import { fieldSelectProps } from './typings'

const FieldSelect = defineComponent({
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
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldSelect.install = function (app: App): App {
    app.component(FieldSelect.name as string, FieldSelect)
    return app
}


export default FieldSelect
