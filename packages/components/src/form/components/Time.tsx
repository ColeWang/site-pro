import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldTimePickerFieldProps,
    FieldTimePickerSlots
} from '../../base-field'

const TIME_VALUE_TYPE: BaseFieldValueType = 'time'

export const timeProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTimePickerFieldProps>,
        default: () => ({})
    }
})

export type TimeProps = Partial<ExtractPropTypes<ReturnType<typeof timeProps>>>;
export type TimeInstance = ComponentPublicInstance<TimeProps>;

const Time = defineComponent({
    inheritAttrs: false,
    name: 'ProTime',
    props: timeProps(),
    slots: Object as FieldSlots & FieldTimePickerSlots,
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TIME_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Time.install = function (app: App): App {
    app.component(Time.name as string, Time)
    return app
}

export default Time
