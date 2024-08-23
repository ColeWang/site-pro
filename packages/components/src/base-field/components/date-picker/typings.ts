import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { DatePickerProps } from '../../../ant-type'

export type FieldProps = DatePickerProps;

export const fieldDatePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<DatePickerProps>,
        default: () => ({})
    }
})

export type FieldDatePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldDatePickerProps>>>;
export type FieldDatePickerInstance = ComponentPublicInstance<FieldDatePickerProps>;
