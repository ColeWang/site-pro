import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { ResizeObserverRectSize } from '../resize-observer'
import type { BaseFormInstance } from '../base-form'
import { baseFormProps } from '../base-form'
import { queryFilterActionsProps } from './Actions'

export type QueryFilterLayout = 'horizontal' | 'vertical';

export const queryFilterProps = () => ({
    ...baseFormProps(),
    ...queryFilterActionsProps(),
    layout: {
        type: String as PropType<QueryFilterLayout>,
        default: 'horizontal'
    },
    labelWidth: {
        type: [Number, String] as PropType<'auto' | number>,
        default: undefined
    },
    span: {
        type: Number as PropType<number>,
        default: undefined
    },
    compact: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    defaultRowsNumber: {
        type: Number as PropType<number>,
        default: 1
    },
    onFormRef: {
        type: Function as PropType<(el: BaseFormInstance | null) => void>,
        default: undefined
    },
    onResize: {
        type: Function as PropType<(size: ResizeObserverRectSize) => void>,
        default: undefined
    },
    onCollapse: {
        type: Function as PropType<(value: boolean) => void>,
        default: undefined
    }
})

export type QueryFilterProps = Partial<ExtractPropTypes<ReturnType<typeof queryFilterProps>>>;
export type QueryFilterInstance = ComponentPublicInstance<QueryFilterProps>;
