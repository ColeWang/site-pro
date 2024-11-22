import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseOptionType } from '@site-pro/utils'
import type { BaseFieldFieldProps, BaseFieldSlots } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldTreeSelectFieldProps = BaseFieldFieldProps<'treeSelect'>;

export const fieldTreeSelectProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldTreeSelectFieldProps & {
            options?: BaseOptionType;
        }>,
        default: () => ({})
    }
})

export interface FieldTreeSelectSlots extends BaseFieldSlots {
    clearIcon?: any;
    renderExtraFooter?: any;
    suffixIcon?: any;
}

export type FieldTreeSelectProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTreeSelectProps>>>;
export type FieldTreeSelectInstance = ComponentPublicInstance<FieldTreeSelectProps>;
