import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldTimePickerFieldProps = BaseFieldFieldProps<'time'>;

export const fieldTimePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldTimePickerFieldProps>,
        default: () => ({})
    }
})

export interface FieldTimePickerSlots {
    clearIcon?: BaseSlot;
    renderExtraFooter?: BaseSlot;
    suffixIcon?: BaseSlot;
}

export type FieldTimePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTimePickerProps>>>;
export type FieldTimePickerInstance = ComponentPublicInstance<FieldTimePickerProps>;
