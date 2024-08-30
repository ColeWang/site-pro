import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldDatePickerFieldProps = BaseFieldFieldProps<'date'>;

export const fieldDatePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export interface FieldDatePickerSlots {
    dateRender?: BaseSlot;
    nextIcon?: BaseSlot;
    prevIcon?: BaseSlot;
    suffixIcon?: BaseSlot;
    superNextIcon?: BaseSlot;
    superPrevIcon?: BaseSlot;
    renderExtraFooter?: BaseSlot;
    monthCellRender?: BaseSlot;
}

export type FieldDatePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldDatePickerProps>>>;
export type FieldDatePickerInstance = ComponentPublicInstance<FieldDatePickerProps>;
