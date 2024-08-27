import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldPasswordFieldProps } from '../../base-field'
import { fieldPasswordSlots } from '../../base-field'

const PASSWORD_VALUE_TYPE: BaseFieldValueType = 'password'

export const passwordProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldPasswordFieldProps>,
        default: () => ({})
    }
})

export type PasswordProps = Partial<ExtractPropTypes<ReturnType<typeof passwordProps>>>;
export type PasswordInstance = ComponentPublicInstance<PasswordProps>;

const Password = defineComponent({
    inheritAttrs: false,
    name: 'ProPassword',
    props: passwordProps(),
    slots: Object.assign(fieldSlots, fieldPasswordSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: PASSWORD_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Password.install = function (app: App): App {
    app.component(Password.name as string, Password)
    return app
}

export default Password
