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

const DATE_YEAR_RANGE_VALUE_TYPE: BaseFieldValueType = 'dateYearRange'

export const dateYearRangeProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldRangePickerFieldProps>,
        default: () => ({})
    }
})

export type DateYearRangeSlots = FieldSlots & FieldRangePickerSlots;
export type DateYearRangeProps = Partial<ExtractPropTypes<ReturnType<typeof dateYearRangeProps>>>;
export type DateYearRangeInstance = ComponentPublicInstance<DateYearRangeProps>;

const DateYearRange = defineComponent({
    inheritAttrs: false,
    name: 'ProDateYearRange',
    props: dateYearRangeProps(),
    slots: Object as SlotsType<DateYearRangeSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_YEAR_RANGE_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateYearRange.install = function (app: App): App {
    app.component(DateYearRange.name as string, DateYearRange)
    return app
}

export default DateYearRange as typeof DateYearRange & Plugin
