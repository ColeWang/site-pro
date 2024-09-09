import type { PropType } from 'vue'
import { tableProps as antTableProps } from 'ant-design-vue/es/table/Table'
import type { BaseEnumType, BaseSlot, ColumnType, TableRowSelection } from '@site-pro/utils'
import type { BaseFieldFieldProps, BaseFieldFormItemProps, BaseFieldValueType } from '../base-field'

export interface TableColumnType<T extends BaseFieldValueType> extends ColumnType {
    search?: false | { transform: (value: any) => any };
    hideInSearch?: boolean;
    hideInTable?: boolean;
    hideInSetting?: boolean;
    hideInDescriptions?: boolean;
    // customRender
    ellipsis?: boolean;
    copyable?: boolean;
    // field
    valueType?: T;
    initialValue?: any;
    valueEnum?: BaseEnumType;
    // 对应 valueType 需要使用类型断言来确保类型正确
    fieldProps?: BaseFieldFieldProps<T>;
    formItemProps?: BaseFieldFormItemProps;
    // setting
    order?: number;
    checked?: boolean;
    disable?: boolean;
}

export interface TableColumnGroup<T extends BaseFieldValueType> extends Omit<TableColumnType<T>, 'dataIndex'> {
    children: TableColumns;
}

export type TableColumns = (TableColumnGroup<BaseFieldValueType> | TableColumnType<BaseFieldValueType>)[];

export const tableProps = () => ({
    ...antTableProps(),
    title: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    columns: {
        type: Array as PropType<TableColumns>,
        default: () => ([])
    },
    rowSelection: {
        type: [Object, Boolean] as PropType<TableRowSelection | boolean>,
        default: false
    },
    scroll: {
        type: Object,
        default: () => ({ x: 'max-content' })
    },
    emptyText: {
        type: String as PropType<string>,
        default: '-'
    },
    search: {
        type: [Object, Boolean],
        default: undefined
    },
    manualRequest: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    request: {
        type: Function,
        default: undefined
    },
    params: {
        type: Object,
        default: () => ({})
    },
    beforeSearchSubmit: {
        type: Function,
        default: undefined
    },
    postData: {
        type: Function,
        default: undefined
    },
    toolbar: {
        type: [Object, Boolean],
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
        type: Function,
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
