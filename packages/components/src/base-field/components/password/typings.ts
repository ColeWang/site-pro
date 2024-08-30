import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
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
    addonAfter?: BaseSlot;
    addonBefore?: BaseSlot;
    clearIcon?: BaseSlot;
    prefix?: BaseSlot;
    suffix?: BaseSlot;
    iconRender?: BaseSlot;
}

export type FieldPasswordProps = Partial<ExtractPropTypes<ReturnType<typeof fieldPasswordProps>>>;
export type FieldPasswordInstance = ComponentPublicInstance<FieldPasswordProps>;
