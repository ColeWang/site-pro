import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type { BaseFieldFormItemProps } from '../../base-field'

export const userFieldProps = () => ({
    ...fieldProps(),
    ...antFormItemProps()
})

export type UserFieldSlots = FieldSlots & { [key: string]: any };
export type UserFieldProps = Partial<ExtractPropTypes<ReturnType<typeof userFieldProps>>>;
export type UserFieldInstance = ComponentPublicInstance<UserFieldProps>;

const UserField = defineComponent({
    inheritAttrs: false,
    name: 'ProUserField',
    props: userFieldProps(),
    slots: Object as SlotsType<UserFieldSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

UserField.install = function (app: App): App {
    app.component(UserField.name as string, UserField)
    return app
}

export default UserField as typeof UserField & Plugin
