import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from '../Field'
import Field, { fieldProps } from '../Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldDatePickerFieldProps,
    FieldDatePickerSlots
} from '../../base-field'

const DATE_MONTH_VALUE_TYPE: BaseFieldValueType = 'dateMonth'

export const dateMonthProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateMonthSlots = FieldSlots & FieldDatePickerSlots;
export type DateMonthProps = Partial<ExtractPropTypes<ReturnType<typeof dateMonthProps>>>;
export type DateMonthInstance = ComponentPublicInstance<DateMonthProps>;

const DateMonth = defineComponent({
    inheritAttrs: false,
    name: 'ProDateMonth',
    props: dateMonthProps(),
    slots: Object as SlotsType<DateMonthSlots>,
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_MONTH_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateMonth.install = function (app: App): App {
    app.component(DateMonth.name as string, DateMonth)
    return app
}

export default DateMonth
