import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldCascaderFieldProps = BaseFieldFieldProps<'cascader'>;

export const fieldCascaderProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldCascaderFieldProps>,
        default: () => ({})
    }
})

export type FieldCascaderProps = Partial<ExtractPropTypes<ReturnType<typeof fieldCascaderProps>>>;
export type FieldCascaderInstance = ComponentPublicInstance<FieldCascaderProps>;
export type FieldCascaderSlots = SlotsType<{
    clearIcon?: BaseSlot;
    expandIcon?: BaseSlot;
    maxTagPlaceholder?: BaseSlot;
    notFoundContent?: BaseSlot;
    removeIcon?: BaseSlot;
    suffixIcon?: BaseSlot;
    tagRender?: BaseSlot;
}>
