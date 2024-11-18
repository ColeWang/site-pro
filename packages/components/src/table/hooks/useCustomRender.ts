import type { ComputedRef } from 'vue'
import { computed, h } from 'vue'
import { TypographyText } from 'ant-design-vue'
import { enumToText, isEmpty, namePathToString } from '@site-pro/utils'
import { isArray, isFunction, isObject } from 'lodash-es'
import { TableColumn, TableProps } from '../typings'

function getEllipsis (column: TableColumn) {
    if (column.ellipsis && column.ellipsis.showTitle === false) {
        return false
    }
    return column.ellipsis
}

function getCopyable (column: TableColumn, text) {
    if (column.copyable && text) {
        if (isObject(column.copyable)) {
            return { text, ...column.copyable }
        }
        return { text, tooltip: true }
    }
    return false
}

function customRender (oldColumn: TableColumn, emptyText?: string) {
    return function ({ text, ...restArgs }) {
        if (oldColumn.customRender && isFunction(oldColumn.customRender)) {
            const oldCustomRender = oldColumn.customRender
            return oldCustomRender.call(null, { text, ...restArgs })
        }
        if (oldColumn.valueEnum && isObject(oldColumn.valueEnum) && !isEmpty(text)) {
            return enumToText(text, oldColumn.valueEnum)
        }
        if ((oldColumn.copyable || oldColumn.ellipsis) && !isEmpty(text)) {
            const copyable = getCopyable(oldColumn, text)
            const ellipsis = getEllipsis(oldColumn)
            return h(TypographyText, { copyable, ellipsis, content: text })
        }
        return isEmpty(text) ? emptyText : text
    }
}

function useCustomRender (props: TableProps) {
    const columns: ComputedRef<TableColumn[]> = computed(() => {
        return genCustomRenderColumns(props.columns || [])
    })

    function genCustomRenderColumns (columns: TableColumn[]) {
        return columns
            .map((column, index) => {
                const key: string = namePathToString(column.dataIndex || column.key || index)
                const tempColumns: TableColumn = { ...column, key: key }
                if (column.children && isArray(column.children)) {
                    tempColumns.children = genCustomRenderColumns(column.children)
                } else {
                    tempColumns.customRender = customRender(column, props.emptyText)
                }
                return tempColumns
            })
            .filter((column) => !column.hideInTable)
    }

    return { columns }
}

export default useCustomRender
