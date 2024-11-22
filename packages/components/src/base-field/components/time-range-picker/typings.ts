import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps, BaseFieldSlots } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldTimeRangePickerFieldProps = BaseFieldFieldProps<'timeRange'>;

export const fieldTimeRangePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldTimeRangePickerFieldProps>,
        default: () => ({})
    }
})

export interface FieldTimeRangePickerSlots extends BaseFieldSlots {
    clearIcon?: any;
    renderExtraFooter?: any;
    suffixIcon?: any;
}

export type FieldTimeRangePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTimeRangePickerProps>>>;
export type FieldTimeRangePickerInstance = ComponentPublicInstance<FieldTimeRangePickerProps>;
