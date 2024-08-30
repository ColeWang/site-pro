import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
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
    checkedChildren?: BaseSlot;
    unCheckedChildren?: BaseSlot;
}

export type FieldSwitchProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSwitchProps>>>;
export type FieldSwitchInstance = ComponentPublicInstance<FieldSwitchProps>;
