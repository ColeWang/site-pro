import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { InputTextAreaProps } from '../../../ant-typings'

export const fieldTextAreaProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<InputTextAreaProps>,
        default: () => ({})
    }
})

export type FieldTextAreaProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTextAreaProps>>>;
export type FieldTextAreaInstance = ComponentPublicInstance<FieldTextAreaProps>;
