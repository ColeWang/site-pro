import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseFieldProps } from '../../typings'
import type { TimePickerProps } from '../../../ant-typings'

export const fieldTimePickerProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<TimePickerProps>,
        default: () => ({})
    }
})

export type FieldTimePickerProps = Partial<ExtractPropTypes<ReturnType<typeof fieldTimePickerProps>>>;
export type FieldTimePickerInstance = ComponentPublicInstance<FieldTimePickerProps>;
