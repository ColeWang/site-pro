import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseAttrs } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldSliderFieldProps = BaseFieldFieldProps<'slider'>;

export const fieldSliderProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldSliderFieldProps & BaseAttrs>,
        default: () => ({})
    }
})

export interface FieldSliderSlots {
    mark?: any;
}

export type FieldSliderProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSliderProps>>>;
export type FieldSliderInstance = ComponentPublicInstance<FieldSliderProps>;
