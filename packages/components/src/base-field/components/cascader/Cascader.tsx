import { defineComponent } from 'vue'
import { Cascader } from 'ant-design-vue'
import { enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldCascaderFieldProps } from './typings'
import { fieldCascaderProps, fieldCascaderSlots } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldCascader',
    props: fieldCascaderProps(),
    slots: fieldCascaderSlots,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToEnum(propsOptions as any, fieldNames)
                const valueText = enumToText(text, optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps: FieldCascaderFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom = <Cascader {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
