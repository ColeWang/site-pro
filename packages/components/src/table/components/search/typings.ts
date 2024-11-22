import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { TableColumn } from '../../typings'
import { queryFilterProps } from '../../../query-filter'

export const baseSearchProps = () => ({
    ...queryFilterProps(),
    manualRequest: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

export interface BaseSearchSlots {
    default?: any;
}

export type BaseSearchProps = Partial<ExtractPropTypes<ReturnType<typeof baseSearchProps>>>;
export type BaseSearchInstance = ComponentPublicInstance<BaseSearchProps>;

export const searchProps = () => ({
    ...baseSearchProps(),
    columns: {
        type: Array as PropType<TableColumn[]>,
        default: () => ([])
    }
})

export type SearchSlots = BaseSearchSlots;
export type SearchProps = Partial<ExtractPropTypes<ReturnType<typeof searchProps>>>;
export type SearchInstance = ComponentPublicInstance<SearchProps>;
