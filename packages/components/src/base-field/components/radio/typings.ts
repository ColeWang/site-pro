import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { RadioGroupProps } from '../../../ant-typings'

export const fieldRadioProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<RadioGroupProps>,
        default: () => ({})
    }
})

export type FieldRadioProps = Partial<ExtractPropTypes<ReturnType<typeof fieldRadioProps>>>;
export type FieldRadioInstance = ComponentPublicInstance<FieldRadioProps>;
