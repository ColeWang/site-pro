import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from '../Field'
import Field, { fieldProps } from '../Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldRangePickerFieldProps,
    FieldRangePickerSlots
} from '../../base-field'

const DATE_WEEK_RANGE_VALUE_TYPE: BaseFieldValueType = 'dateWeekRange'

export const dateWeekRangeProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldRangePickerFieldProps>,
        default: () => ({})
    }
})

export type DateWeekRangeSlots = FieldSlots & FieldRangePickerSlots;
export type DateWeekRangeProps = Partial<ExtractPropTypes<ReturnType<typeof dateWeekRangeProps>>>;
export type DateWeekRangeInstance = ComponentPublicInstance<DateWeekRangeProps>;

const DateWeekRange = defineComponent({
    inheritAttrs: false,
    name: 'ProDateWeekRange',
    props: dateWeekRangeProps(),
    slots: Object as SlotsType<DateWeekRangeSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_WEEK_RANGE_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateWeekRange.install = function (app: App): App {
    app.component(DateWeekRange.name as string, DateWeekRange)
    return app
}

export default DateWeekRange as typeof DateWeekRange & Plugin
