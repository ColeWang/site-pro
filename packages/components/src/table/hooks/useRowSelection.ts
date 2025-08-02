import type { Ref, ShallowReactive } from 'vue'
import { ref, shallowReactive, unref } from 'vue'
import { safeDestructureObject } from '@site-pro/utils'
import { isFunction, isObject } from 'lodash-es'
import type { TableRowSelection } from '../../ant-typings'
import type { TableProps } from '../typings'

interface UseRowSelectionResult {
    rowSelection: ShallowReactive<TableRowSelection>;
    selectedRows: Ref<any[]>;
    onCleanSelected: () => void;
}

function mergeRowSelection (
    defaultValue: TableRowSelection,
    rowSelection?: TableRowSelection | boolean
): TableRowSelection {
    const { selectedRowKeys, ...restValue } = defaultValue
    return {
        selectedRowKeys: selectedRowKeys,
        ...safeDestructureObject(rowSelection),
        ...restValue
    }
}

function useRowSelection (props: TableProps): UseRowSelectionResult {
    const needRowSelection: TableRowSelection = mergeRowSelection({
        selectedRowKeys: [],
        onChange: onChange
    }, props.rowSelection)

    const rowSelection: ShallowReactive<TableRowSelection> = shallowReactive(needRowSelection)
    // rows
    const selectedRows: Ref<any[]> = ref([])

    function mergeSelectedRows (keys: (string | number)[], rows: any[]): any[] {
        const rowKey: string = props.rowKey || 'key'
        return keys.map((key) => {
            const oldRow: any = unref(selectedRows).find((row) => row[rowKey] === key)
            const newRow: any = rows.find((row) => row[rowKey] === key)
            return oldRow || newRow
        })
    }

    /* v8 ignore next 14 */
    function updateSelectedRows (keys: (string | number)[], rows: any[]): void {
        rowSelection.selectedRowKeys = keys
        if (keys.length !== rows.length) {
            selectedRows.value = mergeSelectedRows(keys, rows)
        } else {
            selectedRows.value = rows
        }
    }

    /* v8 ignore next 7 */
    function onChange (keys: (string | number)[], rows: any[]): void {
        const { rowSelection } = props
        if (isObject(rowSelection) && isFunction(rowSelection.onChange)) {
            rowSelection.onChange(keys, rows)
        }
        updateSelectedRows(keys, rows)
    }

    function onCleanSelected (): void {
        updateSelectedRows([], [])
    }

    return { rowSelection, selectedRows, onCleanSelected }
}

export default useRowSelection
