import type { App, SlotsType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { Cascader } from 'ant-design-vue'
import type { BaseEnumType } from '@site-pro/utils'
import { enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale'
import type { FieldCascaderFieldProps, FieldCascaderSlots } from './typings'
import { fieldCascaderProps } from './typings'

const FieldCascader = defineComponent({
    inheritAttrs: false,
    name: 'ProFieldCascader',
    props: fieldCascaderProps(),
    slots: Object as SlotsType<FieldCascaderSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder: string = fieldProps.placeholder || t('selectPlaceholder')!

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum: BaseEnumType = optionsToEnum(propsOptions as any, fieldNames)
                const valueText: VNodeChild = enumToText(text, optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps: FieldCascaderFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom: VNodeChild = <Cascader {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldCascader.install = function (app: App): App {
    app.component(FieldCascader.name as string, FieldCascader)
    return app
}

export default FieldCascader
