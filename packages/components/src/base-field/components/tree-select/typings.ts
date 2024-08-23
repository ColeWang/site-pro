import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseOptionType } from '@site-pro/utils'
import { baseFieldProps } from '../../typings'
import type { TreeSelectProps } from '../../../ant-typings'

export const fieldTreeSelectProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<TreeSelectProps & {
            options?: BaseOptionType;
        }>,
        default: () => ({})
    }
})

export type FieldTreeSelectProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTreeSelectProps>>>;
export type FieldTreeSelectInstance = ComponentPublicInstance<FieldTreeSelectProps>;
