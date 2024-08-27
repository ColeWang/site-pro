import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldRadioFieldProps = BaseFieldFieldProps<'radio'>;

export const fieldRadioSlots = Object as SlotsType<{}>

export const fieldRadioProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldRadioFieldProps>,
        default: () => ({})
    }
})

export type FieldRadioProps = Partial<ExtractPropTypes<ReturnType<typeof fieldRadioProps>>>;
export type FieldRadioInstance = ComponentPublicInstance<FieldRadioProps>;
