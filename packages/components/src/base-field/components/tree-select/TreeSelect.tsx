import type { App, SlotsType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import type { BaseEnumType } from '@site-pro/utils'
import { enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldTreeSelectFieldProps, FieldTreeSelectSlots } from './typings'
import { fieldTreeSelectProps } from './typings'

const FieldTreeSelect = defineComponent({
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
                return valueText ?? emptyText
            }
            const needFieldProps: FieldTreeSelectFieldProps = {
                treeData: options as any,
                allowClear: true,
                ...restFieldProps,
                placeholder: placeholder
            }
            const fieldDom: VNodeChild = <TreeSelect {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldTreeSelect.install = function (app: App): App {
    app.component(FieldTreeSelect.name as string, FieldTreeSelect)
    return app
}

export default FieldTreeSelect
