import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldDatePickerFieldProps } from '../../base-field'
import { fieldDatePickerSlots } from '../../base-field'

const DATE_TIME_VALUE_TYPE: BaseFieldValueType = 'dateTime'

export const dateTimeProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateTimeProps = Partial<ExtractPropTypes<ReturnType<typeof dateTimeProps>>>;
export type DateTimeInstance = ComponentPublicInstance<DateTimeProps>;

const DateTime = defineComponent({
    inheritAttrs: false,
    name: 'ProDateTime',
    props: dateTimeProps(),
    slots: Object.assign(fieldSlots, fieldDatePickerSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_TIME_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateTime.install = function (app: App): App {
    app.component(DateTime.name as string, DateTime)
    return app
}

export default DateTime
