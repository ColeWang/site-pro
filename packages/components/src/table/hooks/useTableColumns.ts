import type { ComputedRef, Ref } from 'vue'
import { computed, ref, unref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import { isBoolean, map, reduce, set } from 'lodash-es'
import useCustomRender from './useCustomRender'
import { TableColumn, TableProps } from '../typings'

interface UseTableColumnsResult {
    columns: ComputedRef<TableColumn[]>;
    columnsMap: Ref<Recordable<TableColumn>>;
    setColumnsMap: (values: Recordable<TableColumn> | undefined) => void;
    resetColumnsMap: () => void;
}

function genColumnsMap (columns: TableColumn[]): Recordable<TableColumn> {
    return reduce(columns, (result, column, index) => {
        const checked: boolean = isBoolean(column.checked) ? column.checked : true
        const disable: boolean = (column.filters || column.sorter) ? true : !!column.disable
        const value: TableColumn = { ...column, checked, disable, order: index }
        return set(result, column.key!, value)
    }, {})
}

function useTableColumns (props: TableProps): UseTableColumnsResult {
    const { columns: sColumns } = useCustomRender(props)

    const columnsMap: Ref<Recordable<TableColumn>> = ref({})

    const columns: ComputedRef<TableColumn[]> = computed(() => {
        return map(columnsMap.value, (column) => column).sort((a, b) => {
            return a.order! - b.order!
        })
    })

    const stopWatchColumns = watch(sColumns, (columns) => {
        columnsMap.value = genColumnsMap(columns)
    }, { immediate: true })

    /* v8 ignore next 3 */
    function setColumnsMap (values: Recordable<TableColumn>): void {
        columnsMap.value = values
    }

    function resetColumnsMap (): void {
        const columns: TableColumn[] = unref(sColumns)
        columnsMap.value = genColumnsMap(columns)
    }

    function onStopHandle (): void {
        stopWatchColumns && stopWatchColumns()
    }

    tryOnScopeDispose(onStopHandle)

    return { columns, columnsMap, setColumnsMap, resetColumnsMap }
}

export default useTableColumns
