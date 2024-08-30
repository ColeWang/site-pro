import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldSelectFieldProps = BaseFieldFieldProps<'select'>;

export const fieldSelectProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldSelectFieldProps>,
        default: () => ({})
    }
})

export interface FieldSelectSlots {
    clearIcon?: BaseSlot;
    dropdownRender?: BaseSlot;
    maxTagPlaceholder?: BaseSlot;
    menuItemSelectedIcon?: BaseSlot;
    notFoundContent?: BaseSlot;
    option?: BaseSlot;
    placeholder?: BaseSlot;
    removeIcon?: BaseSlot;
    suffixIcon?: BaseSlot;
    tagRender?: BaseSlot;
}

export type FieldSelectProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSelectProps>>>;
export type FieldSelectInstance = ComponentPublicInstance<FieldSelectProps>;
