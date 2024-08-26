import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps } from './Field'
import type { BaseFieldFieldProps, BaseFieldFormItemProps, BaseFieldValueType } from '../../base-field'

const valueType: BaseFieldValueType = 'cascader'

export const cascaderProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<BaseFieldFieldProps<'cascader'>>,
        default: () => ({})
    }
})

export type CascaderProps = Partial<ExtractPropTypes<ReturnType<typeof cascaderProps>>>;
export type CascaderInstance = ComponentPublicInstance<CascaderProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProCascader',
    props: cascaderProps(),
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
