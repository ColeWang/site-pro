import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseAttrs } from '@site-pro/utils'
import type { BaseFieldFieldProps, BaseFieldSlots } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldSwitchFieldProps = BaseFieldFieldProps<'switch'>;

export const fieldSwitchProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldSwitchFieldProps & BaseAttrs & {
            value?: boolean | string | number;
            'onUpdate:value'?: (checked: boolean | string | number) => void;
        }>,
        default: () => ({})
    }
})

export interface FieldSwitchSlots extends BaseFieldSlots {
    checkedChildren?: any;
    unCheckedChildren?: any;
}

export type FieldSwitchProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSwitchProps>>>;
export type FieldSwitchInstance = ComponentPublicInstance<FieldSwitchProps>;
