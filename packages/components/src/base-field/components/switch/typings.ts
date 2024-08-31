import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldSwitchFieldProps = BaseFieldFieldProps<'switch'>;

export const fieldSwitchProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldSwitchFieldProps & {
            value?: boolean | string | number;
            'onUpdate:value'?: (checked: boolean | string | number) => void;
            style?: CSSProperties;
        }>,
        default: () => ({})
    }
})

export interface FieldSwitchSlots {
    checkedChildren?: any;
    unCheckedChildren?: any;
}

export type FieldSwitchProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSwitchProps>>>;
export type FieldSwitchInstance = ComponentPublicInstance<FieldSwitchProps>;
