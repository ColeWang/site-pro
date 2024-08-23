import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { CascaderProps } from '../../../ant-typings'

export const fieldCascaderProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<CascaderProps>,
        default: () => ({})
    }
})

export type FieldCascaderProps = Partial<ExtractPropTypes<ReturnType<typeof fieldCascaderProps>>>;
export type FieldCascaderInstance = ComponentPublicInstance<FieldCascaderProps>;
