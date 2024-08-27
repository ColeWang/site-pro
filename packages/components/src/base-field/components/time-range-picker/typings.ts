import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldTimeRangePickerFieldProps = BaseFieldFieldProps<'timeRange'>;

export const fieldTimeRangePickerSlots = Object as SlotsType<{
    clearIcon?: BaseSlot;
    renderExtraFooter?: BaseSlot;
    suffixIcon?: BaseSlot;
}>

export const fieldTimeRangePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldTimeRangePickerFieldProps>,
        default: () => ({})
    }
})

export type FieldTimeRangePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTimeRangePickerProps>>>;
export type FieldTimeRangePickerInstance = ComponentPublicInstance<FieldTimeRangePickerProps>;
