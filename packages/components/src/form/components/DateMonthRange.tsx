import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldRangePickerFieldProps,
    FieldRangePickerSlots
} from '../../base-field'

const DATE_MONTH_RANGE_VALUE_TYPE: BaseFieldValueType = 'dateMonthRange'

export const dateMonthRangeProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldRangePickerFieldProps>,
        default: () => ({})
    }
})

export type DateMonthRangeProps = Partial<ExtractPropTypes<ReturnType<typeof dateMonthRangeProps>>>;
export type DateMonthRangeInstance = ComponentPublicInstance<DateMonthRangeProps>;

const DateMonthRange = defineComponent({
    inheritAttrs: false,
    name: 'ProDateMonthRange',
    props: dateMonthRangeProps(),
    slots: Object as SlotsType<FieldSlots & FieldRangePickerSlots>,
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_MONTH_RANGE_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateMonthRange.install = function (app: App): App {
    app.component(DateMonthRange.name as string, DateMonthRange)
    return app
}

export default DateMonthRange
