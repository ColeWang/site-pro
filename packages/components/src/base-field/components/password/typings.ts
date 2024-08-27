import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldPasswordFieldProps = BaseFieldFieldProps<'password'>;

export const fieldPasswordSlots = Object as SlotsType<{
    addonAfter?: BaseSlot;
    addonBefore?: BaseSlot;
    clearIcon?: BaseSlot;
    prefix?: BaseSlot;
    suffix?: BaseSlot;
    iconRender?: BaseSlot;
}>

export const fieldPasswordProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldPasswordFieldProps>,
        default: () => ({})
    }
})

export type FieldPasswordProps = Partial<ExtractPropTypes<ReturnType<typeof fieldPasswordProps>>>;
export type FieldPasswordInstance = ComponentPublicInstance<FieldPasswordProps>;
