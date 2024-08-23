import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { InputProps } from '../../../ant-typings'

export const fieldTextProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<InputProps>,
        default: () => ({})
    }
})

export type FieldTextProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTextProps>>>;
export type FieldTextInstance = ComponentPublicInstance<FieldTextProps>;
