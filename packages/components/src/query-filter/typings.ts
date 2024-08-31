import type { PropType, ExtractPropTypes, ComponentPublicInstance } from 'vue'
import { baseFormProps } from '../base-form'
import { queryFilterActionsProps } from './Actions'

export const queryFilterProps = () => ({
    ...baseFormProps(),
    ...queryFilterActionsProps(),
    labelWidth: {
        type: [Number, String] as PropType<'auto' | number>,
        default: undefined
    },
    defaultRowsNumber: {
        type: Number as PropType<number>,
        default: 1
    },
    getSpanConfig: {
        type: Function as PropType<() => void>,
        default: undefined
    },
    onResize: {
        type: Function as PropType<() => void>,
        default: undefined
    },
    onCollapse: {
        type: Function as PropType<() => void>,
        default: undefined
    }
})

export type QueryFilterProps = Partial<ExtractPropTypes<ReturnType<typeof queryFilterProps>>>;
export type QueryFilterInstance = ComponentPublicInstance<QueryFilterProps>;
