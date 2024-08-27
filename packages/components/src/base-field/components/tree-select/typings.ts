import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { BaseOptionType, BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
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

export type FieldTreeSelectProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTreeSelectProps>>>;
export type FieldTreeSelectInstance = ComponentPublicInstance<FieldTreeSelectProps>;
export type FieldTreeSelectSlots = SlotsType<{
    clearIcon?: BaseSlot;
    renderExtraFooter?: BaseSlot;
    suffixIcon?: BaseSlot;
}>
