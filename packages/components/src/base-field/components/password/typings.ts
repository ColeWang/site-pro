import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldPasswordFieldProps = BaseFieldFieldProps<'password'>;

export const fieldPasswordProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldPasswordFieldProps>,
        default: () => ({})
    }
})

export interface FieldPasswordSlots {
    addonAfter?: any;
    addonBefore?: any;
    clearIcon?: any;
    prefix?: any;
    suffix?: any;
    iconRender?: any;
}

export type FieldPasswordProps = Partial<ExtractPropTypes<ReturnType<typeof fieldPasswordProps>>>;
export type FieldPasswordInstance = ComponentPublicInstance<FieldPasswordProps>;
