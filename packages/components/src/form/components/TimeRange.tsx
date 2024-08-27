import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldTimeRangePickerFieldProps } from '../../base-field'
import { fieldTimeRangePickerSlots } from '../../base-field'

const TIME_RANGE_VALUE_TYPE: BaseFieldValueType = 'timeRange'

export const timeRangeProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTimeRangePickerFieldProps>,
        default: () => ({})
    }
})

export type TimeRangeProps = Partial<ExtractPropTypes<ReturnType<typeof timeRangeProps>>>;
export type TimeRangeInstance = ComponentPublicInstance<TimeRangeProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTimeRange',
    props: timeRangeProps(),
    slots: Object.assign(fieldSlots, fieldTimeRangePickerSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TIME_RANGE_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})
