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
    FieldTimeRangePickerFieldProps,
    FieldTimeRangePickerSlots
} from '../../base-field'

const TIME_RANGE_VALUE_TYPE: BaseFieldValueType = 'timeRange'

export const timeRangeProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTimeRangePickerFieldProps>,
        default: () => ({})
    }
})

export type TimeRangeSlots = FieldSlots & FieldTimeRangePickerSlots;
export type TimeRangeProps = Partial<ExtractPropTypes<ReturnType<typeof timeRangeProps>>>;
export type TimeRangeInstance = ComponentPublicInstance<TimeRangeProps>;

const TimeRange = defineComponent({
    inheritAttrs: false,
    name: 'ProTimeRange',
    props: timeRangeProps(),
    slots: Object as SlotsType<TimeRangeSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TIME_RANGE_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

TimeRange.install = function (app: App): App {
    app.component(TimeRange.name as string, TimeRange)
    return app
}

export default TimeRange as typeof TimeRange & Plugin
