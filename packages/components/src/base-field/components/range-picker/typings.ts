import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
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

export type FieldRangePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldRangePickerProps>>>;
export type FieldRangePickerInstance = ComponentPublicInstance<FieldRangePickerProps>;
export type FieldRangePickerSlots = SlotsType<{
    dateRender?: BaseSlot;
    nextIcon?: BaseSlot;
    prevIcon?: BaseSlot;
    suffixIcon?: BaseSlot;
    superNextIcon?: BaseSlot;
    superPrevIcon?: BaseSlot;
    separator?: BaseSlot;
}>
