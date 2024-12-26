import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldDatePickerFieldProps,
    FieldDatePickerSlots
} from '../../base-field'

const DATE_TIME_VALUE_TYPE: BaseFieldValueType = 'dateTime'

export const dateTimeProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateTimeSlots = FieldSlots & FieldDatePickerSlots;
export type DateTimeProps = Partial<ExtractPropTypes<ReturnType<typeof dateTimeProps>>>;
export type DateTimeInstance = ComponentPublicInstance<DateTimeProps>;

const DateTime = defineComponent({
    inheritAttrs: false,
    name: 'ProDateTime',
    props: dateTimeProps(),
    slots: Object as SlotsType<DateTimeSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_TIME_VALUE_TYPE,
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

export default DateTime as typeof DateTime & Plugin
