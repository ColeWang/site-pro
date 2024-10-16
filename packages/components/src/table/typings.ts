import type { ComponentPublicInstance, ExtractPropTypes, PropType, Ref } from 'vue'
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
import { BaseFormModel } from '../base-form'

export interface TableColumnType extends AntTableColumnType {
    search?: false | { transform: (value: any) => any };
    hideInSearch?: boolean;
    hideInTable?: boolean;
    hideInSetting?: boolean;
    hideInDescriptions?: boolean;
    // customRender
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

export interface TableColumnGroup extends Omit<TableColumnType, 'dataIndex'> {
    children: TableColumns;
}

export type TableColumns = (TableColumnGroup | TableColumnType)[];

export interface TableScroll {
    x?: number | true | string;
    y?: number | string;
    scrollToFirstRowOnChange?: boolean;
}

export interface TableRequest {
    (params: BaseFormModel, paginate: TablePagination, filter: Recordable<TableFilterValue>, sort: Recordable<TableSortOrder>): Promise<any>;
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
        type: Array as PropType<TableColumns>,
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
        type: [Boolean, Object],
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
        type: Object as PropType<BaseFormModel>,
        default: () => ({})
    },
    beforeSearchSubmit: {
        type: Function as PropType<(values: BaseFormModel) => BaseFormModel>,
        default: undefined
    },
    postData: {
        type: Function as PropType<(data: any[], params: BaseFormModel, paginate: TablePagination, filter: Recordable<TableFilterValue>, sort: Recordable<TableSortOrder>) => any[]>,
        default: undefined
    },
    toolbar: {
        type: [Boolean, Object],
        default: true
    },
    actions: {
        type: Function,
        default: undefined
    },
    settings: {
        type: Function,
        default: undefined
    },
    extra: {
        type: Function,
        default: undefined
    },
    alert: {
        type: Function,
        default: undefined
    },
    alertOptions: {
        type: Function,
        default: undefined
    },
    table: {
        type: Function,
        default: undefined
    },
    onChange: {
        type: Function as PropType<(paginate: TablePagination, filters: Recordable<TableFilterValue>, sorter: TableSorterResult | TableSorterResult[], extra: TableCurrentDataSource) => void>,
        default: undefined
    },
    onPaginateChange: {
        type: Function,
        default: undefined
    },
    onFilterChange: {
        type: Function,
        default: undefined
    },
    onSortChange: {
        type: Function,
        default: undefined
    },
    onLoadingChange: {
        type: Function,
        default: undefined
    },
    onExport: {
        type: Function,
        default: undefined
    },
    onSizeChange: {
        type: Function,
        default: undefined
    },
    onColumnsChange: {
        type: Function,
        default: undefined
    },
    onLoad: {
        type: Function,
        default: undefined
    },
    onRequestError: {
        type: Function,
        default: undefined
    },
    onFinish: {
        type: Function,
        default: undefined
    },
    onReset: {
        type: Function,
        default: undefined
    }
})

export type TableProps = Partial<ExtractPropTypes<ReturnType<typeof tableProps>>>;

export interface TableExpose {
    size: Ref<TableSize>;
    columns: Ref<TableColumns>;
}

export type TableInstance = ComponentPublicInstance<TableProps, TableExpose>;
