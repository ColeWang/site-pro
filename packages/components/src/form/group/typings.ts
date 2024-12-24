import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'

export const formGroupProps = () => ({
    title: {
        type: [String, Function] as PropType<string | BaseSlot>,
        default: undefined
    },
    noStyle: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

export interface FormGroupSlots {
    default?: any;
    title?: any;
}

export type FormGroupProps = Partial<ExtractPropTypes<ReturnType<typeof formGroupProps>>>;
export type FormGroupInstance = ComponentPublicInstance<FormGroupProps>;
