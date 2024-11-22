import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps, BaseFieldSlots } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldCascaderFieldProps = BaseFieldFieldProps<'cascader'>;

export const fieldCascaderProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldCascaderFieldProps>,
        default: () => ({})
    }
})

export interface FieldCascaderSlots extends BaseFieldSlots {
    clearIcon?: any;
    expandIcon?: any;
    maxTagPlaceholder?: any;
    notFoundContent?: any;
    removeIcon?: any;
    suffixIcon?: any;
    tagRender?: any;
}

export type FieldCascaderProps = Partial<ExtractPropTypes<ReturnType<typeof fieldCascaderProps>>>;
export type FieldCascaderInstance = ComponentPublicInstance<FieldCascaderProps>;
