import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'

export const baseLayoutProps = () => ({
    sider: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    header: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    content: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    }
})

export interface BaseLayoutSlots {
    sider?: any;
    header?: any;
    content?: any;
}

export type BaseLayoutProps = Partial<ExtractPropTypes<ReturnType<typeof baseLayoutProps>>>;
export type BaseLayoutInstance = ComponentPublicInstance<BaseLayoutProps>;
