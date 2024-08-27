import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldDatePickerFieldProps } from '../../base-field'
import { fieldDatePickerSlots } from '../../base-field'

const DATE_QUARTER_VALUE_TYPE: BaseFieldValueType = 'dateQuarter'

export const dateQuarterProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateQuarterProps = Partial<ExtractPropTypes<ReturnType<typeof dateQuarterProps>>>;
export type DateQuarterInstance = ComponentPublicInstance<DateQuarterProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProDateQuarter',
    props: dateQuarterProps(),
    slots: Object.assign(fieldSlots, fieldDatePickerSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_QUARTER_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})