import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { Input } from 'ant-design-vue'
import { getPropsSlot, getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../locale-provider'
import type { BaseFieldValueTypeWithFieldProps } from '../typings'
import { baseFieldProps } from '../typings'

type FieldProps = BaseFieldValueTypeWithFieldProps['text']

const fieldTextProps = {
    ...baseFieldProps,
    fieldProps: {
        type: Object as PropType<FieldProps>,
        default: () => ({})
    }
}

export type FieldTextProps = Partial<ExtractPropTypes<typeof fieldTextProps>>;
export type FieldTextInstance = ComponentPublicInstance<FieldTextProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'SFieldText',
    props: fieldTextProps,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                const prefixDom = getPropsSlot(slots, fieldProps, 'prefix')
                const suffixDom = getPropsSlot(slots, fieldProps, 'suffix')
                return (
                    <Fragment>
                        {prefixDom}
                        {text ?? emptyText}
                        {suffixDom}
                    </Fragment>
                )
            }
            const needFieldProps: FieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const dom = <Input {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
