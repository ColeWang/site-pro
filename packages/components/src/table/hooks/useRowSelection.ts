import type { Ref, ShallowReactive } from 'vue'
import { ref, shallowReactive, unref } from 'vue'
import type { TableRowSelection } from '@site-pro/utils'
import { isFunction, isObject, toPlainObject } from 'lodash-es'
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
        selectedRowKeys,
        ...toPlainObject(rowSelection),
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

    /* v8 ignore next 14 */
    function setSelectedRowKeys (keys: (string | number)[], rows: any[]): void {
        rowSelection.selectedRowKeys = keys
        if (keys.length !== rows.length) {
            const { rowKey = 'key' } = props
            selectedRows.value = keys.map((key) => {
                const oldRow = unref(selectedRows).find((row) => row[rowKey] === key)
                const newRow = rows.find((row) => row[rowKey] === key)
                return oldRow || newRow
            })
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
        setSelectedRowKeys(keys, rows)
    }

    function onCleanSelected (): void {
        setSelectedRowKeys([], [])
    }

    return { rowSelection, selectedRows, onCleanSelected }
}

export default useRowSelection
