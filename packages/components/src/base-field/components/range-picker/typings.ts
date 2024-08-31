import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldRangePickerFieldProps = BaseFieldFieldProps<'dateRange'>;

export const fieldRangePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldRangePickerFieldProps>,
        default: () => ({})
    }
})

export interface FieldRangePickerSlots {
    dateRender?: any;
    nextIcon?: any;
    prevIcon?: any;
    suffixIcon?: any;
    superNextIcon?: any;
    superPrevIcon?: any;
    separator?: any;
}

export type FieldRangePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldRangePickerProps>>>;
export type FieldRangePickerInstance = ComponentPublicInstance<FieldRangePickerProps>;
