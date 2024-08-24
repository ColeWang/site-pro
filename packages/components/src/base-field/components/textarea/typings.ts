import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { InputTextareaProps } from '../../../ant-typings'

export const fieldTextareaProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<InputTextareaProps>,
        default: () => ({})
    }
})

export type FieldTextareaProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTextareaProps>>>;
export type FieldTextareaInstance = ComponentPublicInstance<FieldTextareaProps>;
