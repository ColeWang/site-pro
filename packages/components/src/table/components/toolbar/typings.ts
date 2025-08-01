import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'

export const toolbarProps = () => ({
    options: {
        type: [Boolean, Object],
        default: () => ({})
    },
    title: {
        type: [String, Function] as PropType<string | BaseSlot>,
        default: undefined
    },
    actions: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    settings: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    }
})

export interface ToolbarSlots {
    title?: any;
    actions?: any;
    settings?: any;
}

export type ToolbarProps = Partial<ExtractPropTypes<ReturnType<typeof toolbarProps>>>;
export type ToolbarInstance = ComponentPublicInstance<ToolbarProps>;
