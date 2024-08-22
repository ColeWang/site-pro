import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseOptionTextValue } from '@site-pro/utils'
import type { BaseFieldValueTypeWithFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type CascaderProps = BaseFieldValueTypeWithFieldProps['cascader']

export const fieldCascaderProps = () => ({
    ...baseFieldProps(),
    text: {
        type: [String, Number, Array, Object] as PropType<BaseOptionTextValue | BaseOptionTextValue[]>,
        default: undefined
    },
    fieldProps: {
        type: Object as PropType<CascaderProps>,
        default: () => ({})
    }
})

export type FieldCascaderProps = Partial<ExtractPropTypes<typeof fieldCascaderProps>>;
export type FieldCascaderInstance = ComponentPublicInstance<FieldCascaderProps>;
