import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldTextareaFieldProps = BaseFieldFieldProps<'textarea'>;

export const fieldTextareaProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldTextareaFieldProps>,
        default: () => ({})
    }
})

export interface FieldTextareaSlots {
}

export type FieldTextareaProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTextareaProps>>>;
export type FieldTextareaInstance = ComponentPublicInstance<FieldTextareaProps>;
