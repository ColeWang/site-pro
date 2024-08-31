import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldTextFieldProps = BaseFieldFieldProps<'text'>;

export const fieldTextProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldTextFieldProps>,
        default: () => ({})
    }
})

export interface FieldTextSlots {
    addonAfter?: any;
    addonBefore?: any;
    clearIcon?: any;
    prefix?: any;
    suffix?: any;
}

export type FieldTextProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTextProps>>>;
export type FieldTextInstance = ComponentPublicInstance<FieldTextProps>;
