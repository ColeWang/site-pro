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

export type DateMonthRangeSlots = FieldSlots & FieldRangePickerSlots;
export type DateMonthRangeProps = Partial<ExtractPropTypes<ReturnType<typeof dateMonthRangeProps>>>;
export type DateMonthRangeInstance = ComponentPublicInstance<DateMonthRangeProps>;

const DateMonthRange = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProDateMonthRange',
    props: dateMonthRangeProps(),
    slots: Object as SlotsType<DateMonthRangeSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_MONTH_RANGE_VALUE_TYPE,
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

export default DateMonthRange as typeof DateMonthRange & Plugin
