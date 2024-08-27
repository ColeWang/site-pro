import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
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

export type FieldTimePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTimePickerProps>>>;
export type FieldTimePickerInstance = ComponentPublicInstance<FieldTimePickerProps>;
export type FieldTimePickerSlots = SlotsType<{
    clearIcon?: BaseSlot;
    renderExtraFooter?: BaseSlot;
    suffixIcon?: BaseSlot;
}>
