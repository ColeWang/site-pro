import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldCheckboxFieldProps } from '../../base-field'
import { fieldCheckboxSlots } from '../../base-field'

const CHECKBOX_VALUE_TYPE: BaseFieldValueType = 'checkbox'

export const checkboxProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldCheckboxFieldProps>,
        default: () => ({})
    }
})

export type CheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxProps>>>;
export type CheckboxInstance = ComponentPublicInstance<CheckboxProps>;

const Checkbox = defineComponent({
    inheritAttrs: false,
    name: 'ProCheckbox',
    props: checkboxProps(),
    slots: Object.assign(fieldSlots, fieldCheckboxSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: CHECKBOX_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Checkbox.install = function (app: App): App {
    app.component(Checkbox.name as string, Checkbox)
    return app
}

export default Checkbox
