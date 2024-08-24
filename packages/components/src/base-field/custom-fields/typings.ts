import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import type { BaseFieldProps } from '../typings'

export interface BaseValueTypeMap {
    [key: string]: BaseSlot<{
        props: BaseFieldProps;
        slots: Recordable<BaseSlot>;
    }>;
}

export const customFieldsProps = () => ({
    valueTypeMap: {
        type: Object as PropType<BaseValueTypeMap>,
        default: () => ({})
    }
})

export type CustomFieldsProps = Partial<ExtractPropTypes<ReturnType<typeof customFieldsProps>>>;

export interface CustomFieldsExpose {
    valueTypeMap: ComputedRef<BaseValueTypeMap>;
}

export type CustomFieldsInstance = ComponentPublicInstance<CustomFieldsProps, CustomFieldsExpose>;

