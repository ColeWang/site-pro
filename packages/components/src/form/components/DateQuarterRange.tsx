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

const DATE_QUARTER_RANGE_VALUE_TYPE: BaseFieldValueType = 'dateQuarterRange'

export const dateQuarterRangeProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldRangePickerFieldProps>,
        default: () => ({})
    }
})

export type DateQuarterRangeSlots = FieldSlots & FieldRangePickerSlots;
export type DateQuarterRangeProps = Partial<ExtractPropTypes<ReturnType<typeof dateQuarterRangeProps>>>;
export type DateQuarterRangeInstance = ComponentPublicInstance<DateQuarterRangeProps>;

const DateQuarterRange = defineComponent({
    inheritAttrs: false,
    name: 'ProDateQuarterRange',
    props: dateQuarterRangeProps(),
    slots: Object as SlotsType<DateQuarterRangeSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_QUARTER_RANGE_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateQuarterRange.install = function (app: App): App {
    app.component(DateQuarterRange.name as string, DateQuarterRange)
    return app
}

export default DateQuarterRange as typeof DateQuarterRange & Plugin
