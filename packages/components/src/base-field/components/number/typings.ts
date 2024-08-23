import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { InputNumberProps } from '../../../ant-typings'

export const fieldNumberProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<InputNumberProps>,
        default: () => ({})
    }
})

export type FieldNumberProps = Partial<ExtractPropTypes<ReturnType<typeof fieldNumberProps>>>;
export type FieldNumberInstance = ComponentPublicInstance<FieldNumberProps>;
