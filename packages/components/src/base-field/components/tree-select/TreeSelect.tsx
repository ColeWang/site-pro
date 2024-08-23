import { defineComponent } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import { fieldTreeSelectProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldTreeSelect',
    props: fieldTreeSelectProps(),
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { options, ...restFieldProps } = fieldProps
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToEnum(propsOptions as any, fieldNames)
                const valueText = enumToText(text, optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps = {
                treeData: options as any,
                allowClear: true,
                ...restFieldProps,
                placeholder: placeholder
            }
            const fieldDom = <TreeSelect {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
