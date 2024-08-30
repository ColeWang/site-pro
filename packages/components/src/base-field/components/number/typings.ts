import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldNumberFieldProps = BaseFieldFieldProps<'number'>;

export const fieldNumberProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldNumberFieldProps>,
        default: () => ({})
    }
})

export interface FieldNumberSlots {
    addonAfter?: BaseSlot;
    addonBefore?: BaseSlot;
    prefix?: BaseSlot;
    upIcon?: BaseSlot;
    downIcon?: BaseSlot;
}

export type FieldNumberProps = Partial<ExtractPropTypes<ReturnType<typeof fieldNumberProps>>>;
export type FieldNumberInstance = ComponentPublicInstance<FieldNumberProps>;
