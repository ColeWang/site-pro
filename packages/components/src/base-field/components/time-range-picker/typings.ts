import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { TimeRangePickerProps } from '../../../ant-typings'

export const fieldTimeRangePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<TimeRangePickerProps>,
        default: () => ({})
    }
})

export type FieldTimeRangePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTimeRangePickerProps>>>;
export type FieldTimeRangePickerInstance = ComponentPublicInstance<FieldTimeRangePickerProps>;
