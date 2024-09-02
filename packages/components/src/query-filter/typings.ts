import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { ResizeObserverRectSize } from '../resize-observer'
import { baseFormProps } from '../base-form'
import { queryFilterActionsProps } from './Actions'

export type QueryFilterLayout = 'horizontal' | 'vertical';

export interface QueryFilterSpanConfig {
    layout: QueryFilterLayout;
    span: number;
}


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
    defaultRowsNumber: {
        type: Number as PropType<number>,
        default: 1
    },
    getSpanConfig: {
        type: Function as PropType<(layout: string, width: number) => QueryFilterSpanConfig>,
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
