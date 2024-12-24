import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldPasswordFieldProps,
    FieldPasswordSlots
} from '../../base-field'

const PASSWORD_VALUE_TYPE: BaseFieldValueType = 'password'

export const passwordProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldPasswordFieldProps>,
        default: () => ({})
    }
})

export type PasswordSlots = FieldSlots & FieldPasswordSlots;
export type PasswordProps = Partial<ExtractPropTypes<ReturnType<typeof passwordProps>>>;
export type PasswordInstance = ComponentPublicInstance<PasswordProps>;

const Password = defineComponent({
    inheritAttrs: false,
    name: 'ProPassword',
    props: passwordProps(),
    slots: Object as SlotsType<PasswordSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: PASSWORD_VALUE_TYPE,
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

export default Password as typeof Password & Plugin
