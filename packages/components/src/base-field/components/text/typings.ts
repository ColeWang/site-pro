import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
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

export type FieldTextProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTextProps>>>;
export type FieldTextInstance = ComponentPublicInstance<FieldTextProps>;
export type FieldTextSlots = SlotsType<{
    addonAfter?: BaseSlot;
    addonBefore?: BaseSlot;
    clearIcon?: BaseSlot;
    prefix?: BaseSlot;
    suffix?: BaseSlot;
}>
