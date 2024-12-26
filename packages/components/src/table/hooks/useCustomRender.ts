import type { ComputedRef } from 'vue'
import { computed, createVNode } from 'vue'
import { Typography as AntTypography } from 'ant-design-vue'
import { enumToText, isEmpty, namePathToString } from '@site-pro/utils'
import { isArray, isFunction, isObject } from 'lodash-es'
import type { TypographyCopyable } from '../../ant-typings'
import { TableColumn, TableProps } from '../typings'

interface UseCustomRenderResult {
    columns: ComputedRef<TableColumn[]>;
}

interface CustomRenderResult {
    (opt: any): any;
}

function getEllipsis (column: TableColumn): boolean | undefined {
    if (isObject(column.ellipsis)) {
        return column.ellipsis.showTitle
    }
    return column.ellipsis
}

function getCopyable (column: TableColumn, text: any): false | TypographyCopyable {
    if (column.copyable && text) {
        if (isObject(column.copyable)) {
            return { text, ...column.copyable }
        }
        return { text, tooltip: true }
    }
    return false
}

function customRender (oldColumn: TableColumn, emptyText?: string): CustomRenderResult {
    return function (opt: any): any {
        if (oldColumn.customRender && isFunction(oldColumn.customRender)) {
            const oldCustomRender = oldColumn.customRender
            return oldCustomRender.call(null, opt)
        }
        if (oldColumn.valueEnum && isObject(oldColumn.valueEnum) && !isEmpty(opt.text)) {
            return enumToText(opt.text, oldColumn.valueEnum)
        }
        if ((oldColumn.copyable || oldColumn.ellipsis) && !isEmpty(opt.text)) {
            const copyable: boolean | TypographyCopyable = getCopyable(oldColumn, opt.text)
            const ellipsis: boolean | undefined = getEllipsis(oldColumn)
            return createVNode(AntTypography.Text, { copyable, ellipsis, content: opt.text })
        }
        return isEmpty(opt.text) ? emptyText : opt.text
    }
}

function useCustomRender (props: TableProps): UseCustomRenderResult {
    const columns: ComputedRef<TableColumn[]> = computed(() => {
        return genCustomRenderColumns(props.columns || [])
    })

    function genCustomRenderColumns (columns: TableColumn[]): TableColumn[] {
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
