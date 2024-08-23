import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseOptionTextValue } from '@site-pro/utils'
import type { RangePickerProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export const fieldRangePickerProps = () => ({
    ...baseFieldProps(),
    text: {
        type: [String, Number, Array, Object] as PropType<BaseOptionTextValue | BaseOptionTextValue[]>,
        default: undefined
    },
    fieldProps: {
        type: Object as PropType<RangePickerProps>,
        default: () => ({})
    }
})

export type FieldRangePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldRangePickerProps>>>;
export type FieldRangePickerInstance = ComponentPublicInstance<FieldRangePickerProps>;
