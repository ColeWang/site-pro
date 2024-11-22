import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps, BaseFieldSlots } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldSelectFieldProps = BaseFieldFieldProps<'select'>;

export const fieldSelectProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldSelectFieldProps>,
        default: () => ({})
    }
})

export interface FieldSelectSlots extends BaseFieldSlots {
    clearIcon?: any;
    dropdownRender?: any;
    maxTagPlaceholder?: any;
    menuItemSelectedIcon?: any;
    notFoundContent?: any;
    option?: any;
    placeholder?: any;
    removeIcon?: any;
    suffixIcon?: any;
    tagRender?: any;
}

export type FieldSelectProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSelectProps>>>;
export type FieldSelectInstance = ComponentPublicInstance<FieldSelectProps>;
