import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldSliderFieldProps = BaseFieldFieldProps<'slider'>;

export const fieldSliderProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldSliderFieldProps & {
            style?: CSSProperties;
        }>,
        default: () => ({})
    }
})

export interface FieldSliderSlots {
    mark?: BaseSlot;
}

export type FieldSliderProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSliderProps>>>;
export type FieldSliderInstance = ComponentPublicInstance<FieldSliderProps>;
