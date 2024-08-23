import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { SliderProps } from '../../../ant-typings'

export const fieldSliderProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<SliderProps & {
            style?: CSSProperties;
        }>,
        default: () => ({})
    }
})

export type FieldSliderProps = Partial<ExtractPropTypes<ReturnType<typeof fieldSliderProps>>>;
export type FieldSliderInstance = ComponentPublicInstance<FieldSliderProps>;
