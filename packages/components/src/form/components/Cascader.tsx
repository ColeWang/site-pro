import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldCascaderFieldProps } from '../../base-field'
import { fieldCascaderSlots } from '../../base-field'

const CASCADER_VALUE_TYPE: BaseFieldValueType = 'cascader'

export const cascaderProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldCascaderFieldProps>,
        default: () => ({})
    }
})

export type CascaderProps = Partial<ExtractPropTypes<ReturnType<typeof cascaderProps>>>;
export type CascaderInstance = ComponentPublicInstance<CascaderProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProCascader',
    props: cascaderProps(),
    slots: Object.assign(fieldSlots, fieldCascaderSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: CASCADER_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})
