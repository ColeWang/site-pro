import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { CascaderProps } from '../../../ant-type'

export type FieldProps = CascaderProps;

export const fieldCascaderProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldProps>,
        default: () => ({})
    }
})

export type FieldCascaderProps = Partial<ExtractPropTypes<ReturnType<typeof fieldCascaderProps>>>;
export type FieldCascaderInstance = ComponentPublicInstance<FieldCascaderProps>;
