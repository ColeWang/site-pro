import { computed, ref, unref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import { isBoolean, isObject, map, reduce, set } from 'lodash-es'
import useCustomRender from './useCustomRender'
import { TableColumns } from '../typings'

function genColumnsMap (columns: TableColumns) {
    return reduce(columns, (result, column, index) => {
        const checked = isBoolean(column.checked) ? column.checked : true
        const disable = (column.filters || column.sorter) ? true : column.disable
        const key = column.dataIndex || column.key || String(index)
        const value = { ...column, checked, disable, order: index }
        return set(result, key, value)
    }, {})
}

function useTableColumns (props) {
    const { columns: baseColumns } = useCustomRender(props)

    const columnsMap = ref({})

    const columns = computed(() => {
        const values = map(columnsMap.value, (column) => column)
        return values.sort((a, b) => a.order - b.order)
    })

    const stopWatchColumns = watch(baseColumns, (columns) => {
        columnsMap.value = genColumnsMap(columns)
    }, { immediate: true })

    /* v8 ignore next 8 */
    function setColumnsMap (values) {
        const columns = unref(baseColumns)
        if (values && isObject(values)) {
            columnsMap.value = values
        } else {
            columnsMap.value = genColumnsMap(columns)
        }
    }

    function onStopHandle () {
        stopWatchColumns && stopWatchColumns()
    }

    tryOnScopeDispose(onStopHandle)

    return { columns, columnsMap, setColumnsMap }
}

export default useTableColumns
