import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps, BaseFieldSlots } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldRadioFieldProps = BaseFieldFieldProps<'radio'>;

export const fieldRadioProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldRadioFieldProps>,
        default: () => ({})
    }
})

export type FieldRadioSlots = BaseFieldSlots;
export type FieldRadioProps = Partial<ExtractPropTypes<ReturnType<typeof fieldRadioProps>>>;
export type FieldRadioInstance = ComponentPublicInstance<FieldRadioProps>;
