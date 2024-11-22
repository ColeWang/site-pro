import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps, BaseFieldSlots } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldTimePickerFieldProps = BaseFieldFieldProps<'time'>;

export const fieldTimePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldTimePickerFieldProps>,
        default: () => ({})
    }
})

export interface FieldTimePickerSlots extends BaseFieldSlots {
    clearIcon?: any;
    renderExtraFooter?: any;
    suffixIcon?: any;
}

export type FieldTimePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTimePickerProps>>>;
export type FieldTimePickerInstance = ComponentPublicInstance<FieldTimePickerProps>;
