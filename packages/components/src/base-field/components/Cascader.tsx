import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Cascader } from 'ant-design-vue'
import type { BaseTextType } from '@site-pro/utils'
import { getSlotVNode, optionsToValueEnum, valueEnumToText } from '@site-pro/utils'
import { useLocaleReceiver } from '../../locale-provider'
import type { BaseFieldValueTypeWithFieldProps } from '../typings'
import { baseFieldProps } from '../typings'

type FieldProps = BaseFieldValueTypeWithFieldProps['cascader']

const fieldCascaderProps = {
    ...baseFieldProps,
    text: {
        type: [String, Number, Array, Object] as PropType<BaseTextType | BaseTextType[]>,
        default: undefined
    },
    fieldProps: {
        type: Object as PropType<FieldProps>,
        default: () => ({})
    }
}

export type FieldCascaderProps = Partial<ExtractPropTypes<typeof fieldCascaderProps>>;
export type FieldCascaderInstance = ComponentPublicInstance<FieldCascaderProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'SFieldCascader',
    props: fieldCascaderProps,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToValueEnum(propsOptions, fieldNames)
                const valueText = valueEnumToText(text, optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const dom = <Cascader {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
