import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { RangePickerProps } from '../../../ant-typings'

export const fieldRangePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<RangePickerProps>,
        default: () => ({})
    }
})

export type FieldRangePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldRangePickerProps>>>;
export type FieldRangePickerInstance = ComponentPublicInstance<FieldRangePickerProps>;
