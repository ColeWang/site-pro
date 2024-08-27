import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldRangePickerFieldProps } from '../../base-field'
import { fieldRangePickerSlots } from '../../base-field'

const DATE_QUARTER_RANGE_VALUE_TYPE: BaseFieldValueType = 'dateQuarterRange'

export const dateQuarterRangeProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldRangePickerFieldProps>,
        default: () => ({})
    }
})

export type DateQuarterRangeProps = Partial<ExtractPropTypes<ReturnType<typeof dateQuarterRangeProps>>>;
export type DateQuarterRangeInstance = ComponentPublicInstance<DateQuarterRangeProps>;

const DateQuarterRange = defineComponent({
    inheritAttrs: false,
    name: 'ProDateQuarterRange',
    props: dateQuarterRangeProps(),
    slots: Object.assign(fieldSlots, fieldRangePickerSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_QUARTER_RANGE_VALUE_TYPE,
                fieldProps: propsFieldProps,
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

export default DateQuarterRange
