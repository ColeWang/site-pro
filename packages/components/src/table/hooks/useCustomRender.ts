import type { ComputedRef } from 'vue'
import { computed, createVNode } from 'vue'
import { Typography as AntTypography } from 'ant-design-vue'
import { isEmpty, namePathToString } from '@site-pro/utils'
import { isArray, isFunction, isObject, isString } from 'lodash-es'
import { baseFieldParsingText } from '../../base-field'
import type { TextCopyable } from '../../ant-typings'
import { TableColumn, TableProps } from '../typings'

interface UseCustomRenderResult {
    columns: ComputedRef<TableColumn[]>;
}

interface CreateCustomRenderResult {
    (opt: any): any;
}

function getEllipsis (column: TableColumn): boolean | undefined {
    if (isObject(column.ellipsis)) {
        return column.ellipsis.showTitle
    }
    return column.ellipsis
}

function getCopyable (column: TableColumn, text: any): false | TextCopyable {
    if (column.copyable && text) {
        if (isObject(column.copyable)) {
            return { text, ...column.copyable }
        }
        return { text, tooltip: true }
    }
    return false
}

function createCustomRender (column: TableColumn, emptyText?: string): CreateCustomRenderResult {
    return function (options: any): any {
        if (column.customRender && isFunction(column.customRender)) {
            return column.customRender.call(null, options)
        }
        if (column.valueEnum && isObject(column.valueEnum) && !isEmpty(options.text)) {
            return baseFieldParsingText(options.text, column.valueEnum)
        }
        if ((column.copyable || column.ellipsis) && isString(options.text) && !isEmpty(options.text)) {
            return createVNode(AntTypography.Text, {
                copyable: getCopyable(column, options.text),
                ellipsis: getEllipsis(column),
                content: options.text
            })
        }
        return isEmpty(options.text) ? emptyText : options.text
    }
}

function useCustomRender (props: TableProps): UseCustomRenderResult {
    const columns: ComputedRef<TableColumn[]> = computed(() => {
        const needColumns: TableColumn[] = (props.columns || []).filter((column) => {
            return column && !column.hideInTable
        })
        return transformColumns(needColumns, props.emptyText)
    })


    function transformColumns (columns: TableColumn[], emptyText?: string): TableColumn[] {
        return columns.map((column, index) => {
            const key: string = namePathToString(column.dataIndex || column.key || index)
            const enhanced: TableColumn = { ...column, key: key }
            if (column.children && isArray(column.children)) {
                enhanced.children = transformColumns(column.children, emptyText)
            } else {
                enhanced.customRender = createCustomRender(column, emptyText)
            }
            return enhanced
        })
    }

    return { columns }
}

export default useCustomRender
