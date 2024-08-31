import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
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
    dateRender?: any;
    nextIcon?: any;
    prevIcon?: any;
    suffixIcon?: any;
    superNextIcon?: any;
    superPrevIcon?: any;
    renderExtraFooter?: any;
    monthCellRender?: any;
}

export type FieldDatePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldDatePickerProps>>>;
export type FieldDatePickerInstance = ComponentPublicInstance<FieldDatePickerProps>;
