import { ComponentPublicInstance, ExtractPropTypes, PropType, Ref } from 'vue'
import { tableProps as antTableProps } from 'ant-design-vue/es/table/Table'
import type { BaseEnumType, BaseSlot, Recordable } from '@site-pro/utils'
import type { QueryFilterBreakPoint } from '../query-filter'
import type { SearchProps } from './components/search'
import type { ToolbarProps } from './components/toolbar'
import type { UseFetchDataContext } from './hooks/useFetchData'
import type { BaseFieldFieldProps, BaseFieldFormItemProps, BaseFieldValueType } from '../base-field'
import type {
    TableColumnType as AntTableColumnType,
    TableCurrentDataSource,
    TableFilterValue,
    TablePagination,
    TableRowSelection,
    TableSorterResult,
    TableSortOrder,
    TypographyCopyable
} from '../ant-typings'

interface TableColumnSearchObject {
    transform?: (value: any) => any;
}

export interface TableColumn<RecordType = any> extends AntTableColumnType<RecordType> {
    key?: string | number; // 占用
    dataIndex?: string | number | (string | number)[];
    children?: TableColumn<RecordType>[];
    // table
    search?: boolean | TableColumnSearchObject;
    hideInSearch?: boolean;
    hideInTable?: boolean;
    hideInSetting?: boolean;
    hideInDescriptions?: boolean;
    ellipsis?: boolean | { showTitle?: boolean };
    copyable?: boolean | TypographyCopyable;
    // field
    valueType?: BaseFieldValueType;
    initialValue?: any;
    valueEnum?: BaseEnumType;
    // 对应 valueType 需要使用类型断言来确保类型正确
    fieldProps?: BaseFieldFieldProps<BaseFieldValueType>;
    formItemProps?: BaseFieldFormItemProps;
    // setting
    order?: number;
    checked?: boolean;
    disable?: boolean;
}

export interface TableScroll {
    x?: number | true | string;
    y?: number | string;
    scrollToFirstRowOnChange?: boolean;
}

export interface TableRequest {
    (params: Recordable, paginate: false | TablePagination): Promise<any>;
}

export interface TablePostData {
    (data: any[], params: Recordable, paginate: false | TablePagination): any[];
}

export interface TableOnChange {
    (
        paginate: TablePagination,
        filters: Recordable<TableFilterValue>,
        sorter: TableSorterResult | TableSorterResult[],
        extra: TableCurrentDataSource
    ): void;
}

export type TableSize = 'small' | 'large' | 'middle'

export function createTableColumn<T extends BaseFieldValueType, RecordType = any> (
    column: Omit<TableColumn<RecordType>, 'valueType' | 'fieldProps'> & {
        valueType?: T;
        fieldProps?: BaseFieldFieldProps<T>;
    }
): TableColumn<RecordType> {
    return column
}

const baseTableProps = () => ({
    ...antTableProps(),
    rowKey: {
        type: String as PropType<string>,
        default: undefined
    },
    size: {
        type: String as PropType<TableSize>,
        default: 'middle'
    },
    title: {
        type: [String, Function] as PropType<string | BaseSlot>,
        default: undefined
    },
    columns: {
        type: Array as PropType<TableColumn[]>,
        default: () => ([])
    },
    rowSelection: {
        type: [Boolean, Object] as PropType<boolean | TableRowSelection>,
        default: false
    },
    scroll: {
        type: Object as PropType<TableScroll>,
        default: () => ({ x: 'max-content' })
    },
    emptyText: {
        type: String as PropType<string>,
        default: '-'
    }
})

export const tableProps = () => ({
    ...baseTableProps(),
    compact: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    breakPoints: {
        type: Array as PropType<QueryFilterBreakPoint[]>,
        default: undefined
    },
    search: {
        type: [Boolean, Object] as PropType<boolean | SearchProps>,
        default: undefined
    },
    manualRequest: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    request: {
        type: Function as PropType<TableRequest>,
        default: undefined
    },
    params: {
        type: Object as PropType<Recordable>,
        default: () => ({})
    },
    beforeSearchSubmit: {
        type: Function as PropType<(values: Recordable) => Recordable>,
        default: undefined
    },
    postData: {
        type: Function as PropType<TablePostData>,
        default: undefined
    },
    toolbar: {
        type: [Boolean, Object] as PropType<boolean | ToolbarProps>,
        default: true
    },
    actions: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    settings: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    extra: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    alert: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    alertOptions: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    table: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    onChange: {
        type: Function as PropType<TableOnChange>,
        default: undefined
    },
    onPaginateChange: {
        type: Function as PropType<(paginate: TablePagination) => void>,
        default: undefined
    },
    onFilterChange: {
        type: Function as PropType<(filter: Recordable<TableFilterValue>) => void>,
        default: undefined
    },
    onSortChange: {
        type: Function as PropType<(sort: Recordable<TableSortOrder>) => void>,
        default: undefined
    },
    onLoadingChange: {
        type: Function as PropType<(value: boolean) => void>,
        default: undefined
    },
    onExport: {
        type: Function as PropType<(params: { pageData: any[], tableEl: HTMLElement, params: Recordable }) => void>,
        default: undefined
    },
    onColumnsChange: {
        type: Function as PropType<(columns: TableColumn[]) => void>,
        default: undefined
    },
    onLoad: {
        type: Function as PropType<(dataSource: any[]) => void>,
        default: undefined
    },
    onRequestError: {
        type: Function as PropType<(err: Error) => void>,
        default: undefined
    },
    onFinish: {
        type: Function as PropType<(values: Recordable) => void>,
        default: undefined
    },
    onReset: {
        type: Function as PropType<(values: Recordable) => void>,
        default: undefined
    }
})

export interface TableSlots {
    search?: any;
    title?: any;
    actions?: any;
    settings?: any;
    alert?: any;
    alertOptions?: any;
    extra?: any;
    bodyCell?: any;
    customFilterDropdown?: any;
    customFilterIcon?: any;
    emptyText?: any;
    expandedRowRender?: any;
    expandColumnTitle?: any;
    expandIcon?: any;
    footer?: any;
    headerCell?: any;
    summary?: any;
}

export interface TableSharedContext {
    requestProps: UseFetchDataContext;
    tableSize: Ref<TableSize>;
    columns: Ref<TableColumn[]>;
    columnsMap: Ref<Recordable<TableColumn>>;
    onReload: (resetCurrent?: boolean) => void;
    onExport: () => void;
    onSizeChange: (size: TableSize) => void;
    onColumnsMapChange: (values?: Recordable<TableColumn>) => void;
}

export type TableProps = Partial<ExtractPropTypes<ReturnType<typeof tableProps>>>;

export interface TableExpose {
    reload: (resetCurrent: boolean) => void;
    cleanSelected: () => void;
}

export type TableInstance = ComponentPublicInstance<TableProps, TableExpose>;
