import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { CheckboxGroupProps } from '../../../ant-type'

export type FieldProps = CheckboxGroupProps;

export const fieldCheckboxProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldProps>,
        default: () => ({})
    }
})

export type FieldCheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof fieldCheckboxProps>>>;
export type FieldCheckboxInstance = ComponentPublicInstance<FieldCheckboxProps>;
