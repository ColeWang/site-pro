import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldProps } from '../typings'

export interface BaseValueTypeMap {
    [key: string]: BaseSlot<{
        props: BaseFieldProps;
        slots: BaseSlot;
    }>;
}

export const customFieldsProps = () => ({
    valueTypeMap: {
        type: Object as PropType<BaseValueTypeMap>,
        default: () => ({})
    }
})

export type CustomFieldsProps = Partial<ExtractPropTypes<typeof customFieldsProps>>;
// export type CustomFieldsExpose = {};
export type CustomFieldsInstance = ComponentPublicInstance<CustomFieldsProps>;

