import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldSelectFieldProps,
    FieldSelectSlots
} from '../../base-field'

const SELECT_VALUE_TYPE: BaseFieldValueType = 'select'

export const selectProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldSelectFieldProps>,
        default: () => ({})
    }
})

export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof selectProps>>>;
export type SelectInstance = ComponentPublicInstance<SelectProps>;

const Select = defineComponent({
    inheritAttrs: false,
    name: 'ProSelect',
    props: selectProps(),
    slots: Object as FieldSlots & FieldSelectSlots,
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

Select.install = function (app: App): App {
    app.component(Select.name as string, Select)
    return app
}

export default Select
