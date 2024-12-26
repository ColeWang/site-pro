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

const DATE_TIME_RANGE_VALUE_TYPE: BaseFieldValueType = 'dateTimeRange'

export const dateTimeRangeProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldRangePickerFieldProps>,
        default: () => ({})
    }
})

export type DateTimeRangeSlots = FieldSlots & FieldRangePickerSlots;
export type DateTimeRangeProps = Partial<ExtractPropTypes<ReturnType<typeof dateTimeRangeProps>>>;
export type DateTimeRangeInstance = ComponentPublicInstance<DateTimeRangeProps>;

const DateTimeRange = defineComponent({
    inheritAttrs: false,
    name: 'ProDateTimeRange',
    props: dateTimeRangeProps(),
    slots: Object as SlotsType<DateTimeRangeSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_TIME_RANGE_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateTimeRange.install = function (app: App): App {
    app.component(DateTimeRange.name as string, DateTimeRange)
    return app
}

export default DateTimeRange as typeof DateTimeRange & Plugin
