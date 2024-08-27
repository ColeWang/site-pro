import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldCheckboxFieldProps = BaseFieldFieldProps<'checkbox'>;

export const fieldCheckboxProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldCheckboxFieldProps>,
        default: () => ({})
    }
})

export type FieldCheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof fieldCheckboxProps>>>;
export type FieldCheckboxInstance = ComponentPublicInstance<FieldCheckboxProps>;
export type FieldCheckboxSlots = SlotsType<{}>
