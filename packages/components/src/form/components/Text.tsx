import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import type { BaseSlot } from '@site-pro/utils'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps } from './Field'
import { formItemProps } from '../../ant-typings'
import type { BaseFieldFieldProps, BaseFieldFormItemProps, BaseFieldValueType } from '../../base-field'

const valueType: BaseFieldValueType = 'text'

export const textProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<BaseFieldFieldProps<'text'>>,
        default: () => ({})
    }
})

export type TextProps = Partial<ExtractPropTypes<ReturnType<typeof textProps>>>;
export type TextInstance = ComponentPublicInstance<TextProps>;

const Text = defineComponent({
    inheritAttrs: false,
    name: 'ProText',
    props: textProps(),
    slots: Object as SlotsType<{
        addonAfter?: BaseSlot;
    }>,
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: valueType,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

export default Text
