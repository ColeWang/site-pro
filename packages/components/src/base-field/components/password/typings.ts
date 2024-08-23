import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseOptionTextValue } from '@site-pro/utils'
import type { PasswordProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export const fieldPasswordProps = {
    ...baseFieldProps,
    text: {
        type: [String, Number, Array, Object] as PropType<BaseOptionTextValue | BaseOptionTextValue[]>,
        default: undefined
    },
    fieldProps: {
        type: Object as PropType<PasswordProps>,
        default: () => ({})
    }
}

export type FieldPasswordProps = Partial<ExtractPropTypes<typeof fieldPasswordProps>>;
export type FieldPasswordInstance = ComponentPublicInstance<FieldPasswordProps>;
