import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { SelectProps } from '../../../ant-typings'

export const fieldSelectProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<SelectProps>,
        default: () => ({})
    }
})

export type FieldSelectProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSelectProps>>>;
export type FieldSelectInstance = ComponentPublicInstance<FieldSelectProps>;
