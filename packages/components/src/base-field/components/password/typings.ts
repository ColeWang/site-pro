import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { InputPasswordProps } from '../../../ant-typings'

export const fieldPasswordProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<InputPasswordProps>,
        default: () => ({})
    }
})

export type FieldPasswordProps = Partial<ExtractPropTypes<ReturnType<typeof fieldPasswordProps>>>;
export type FieldPasswordInstance = ComponentPublicInstance<FieldPasswordProps>;
