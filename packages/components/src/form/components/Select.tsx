import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldSelectFieldProps } from '../../base-field'
import { fieldSelectSlots } from '../../base-field'

const SELECT_VALUE_TYPE: BaseFieldValueType = 'select'

export const selectProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldSelectFieldProps>,
        default: () => ({})
    }
})

export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof selectProps>>>;
export type SelectInstance = ComponentPublicInstance<SelectProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProSelect',
    props: selectProps(),
    slots: Object.assign(fieldSlots, fieldSelectSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: SELECT_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})
