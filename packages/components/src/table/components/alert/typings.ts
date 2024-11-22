import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'

export const alertProps = () => ({
    selectedRowKeys: {
        type: Array as PropType<(string | number)[]>,
        default: () => ([])
    },
    selectedRows: {
        type: Array as PropType<any[]>,
        default: () => ([])
    },
    options: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    onCleanSelected: {
        type: Function as PropType<() => void>,
        default: undefined
    }
})

export interface AlertSlots {
    default?: any;
    options?: any;
}

export type AlertProps = Partial<ExtractPropTypes<ReturnType<typeof alertProps>>>;
export type AlertInstance = ComponentPublicInstance<AlertProps>;
