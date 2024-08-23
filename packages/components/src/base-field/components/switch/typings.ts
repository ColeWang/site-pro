import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { SwitchProps } from '../../../ant-typings'

export const fieldSwitchProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<SwitchProps & {
            value?: boolean | string | number;
            'onUpdate:value'?: (checked: boolean | string | number) => void;
            style?: CSSProperties;
        }>,
        default: () => ({})
    }
})

export type FieldSwitchProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSwitchProps>>>;
export type FieldSwitchInstance = ComponentPublicInstance<FieldSwitchProps>;
