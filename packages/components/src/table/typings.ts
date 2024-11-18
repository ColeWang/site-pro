import { ComponentPublicInstance, ExtractPropTypes, PropType, Ref } from 'vue'
import { tableProps as antTableProps } from 'ant-design-vue/es/table/Table'
import type {
    BaseEnumType,
    BaseSlot,
    Recordable,
    TableColumnType as AntTableColumnType,
    TableCurrentDataSource,
    TableFilterValue,
    TablePagination,
    TableRowSelection,
    TableSorterResult,
    TableSortOrder
} from '@site-pro/utils'
import type { BaseFieldFieldProps, BaseFieldFormItemProps, BaseFieldValueType } from '../base-field'

export interface TableColumn extends AntTableColumnType {
    key?: string | number; // 占用
    dataIndex?: string | number | (string | number)[];
    children?: TableColumn[];
    // table
    search?: false | { transform: (value: any) => any };
    hideInSearch?: boolean;
    hideInTable?: boolean;
    hideInSetting?: boolean;
    hideInDescriptions?: boolean;
    // @todo customRender
    ellipsis?: boolean;
    copyable?: boolean;
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

export const tableProps = () => ({
    ...antTableProps(),
    size: {
        type: String as PropType<TableSize>,
        default: 'middle'
    },
    title: {
        type: Function as PropType<BaseSlot>,
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
    },
    search: {
        type: [Boolean, Object] as PropType<boolean | {}>,
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
        type: [Boolean, Object] as PropType<boolean | {}>,
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
    onSizeChange: {
        type: Function as PropType<(value: TableSize) => void>,
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

export type TableProps = Partial<ExtractPropTypes<ReturnType<typeof tableProps>>>;

export interface TableExpose {
    size: Ref<TableSize>;
    columns: Ref<TableColumn[]>;
    reload: (resetCurrent: boolean) => void;
    cleanSelected: () => void;
}

export type TableInstance = ComponentPublicInstance<TableProps, TableExpose>;
