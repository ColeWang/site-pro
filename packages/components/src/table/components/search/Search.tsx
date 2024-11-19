import type { PropType, ComputedRef } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import type { Recordable } from '@site-pro/utils'
import { isEmpty, namePathToString } from '@site-pro/utils'
import { pick, reduce, set } from 'lodash-es'
import BaseSearch, { baseSearchProps } from './BaseSearch'
import type { TableColumn } from '../../typings'
import { Field } from '../../../form'

function filterSearchColumns (columns: TableColumn[]): TableColumn[] {
    return columns.filter((column) => column.search)
}

export const searchProps = () => ({
    ...baseSearchProps(),
    columns: {
        type: Array as PropType<TableColumn[]>,
        default: () => ([])
    }
})

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableSearch',
    props: searchProps(),
    setup (props, { attrs }) {
        const defaultColumns: TableColumn[] = filterSearchColumns(props.columns)
        const initialValues: Recordable = reduce(defaultColumns, (result, column) => {
            const namePath = column.dataIndex || column.key
            if (namePath && !isEmpty(column.initialValue)) {
                return set(result, namePath, column.initialValue)
            }
            return result
        }, {})

        const searchColumns: ComputedRef<TableColumn[]> = computed(() => filterSearchColumns(props.columns))

        return () => {
            const baseSearchProps = {
                ...attrs,
                ...pick(props, Object.keys(BaseSearch.props)),
                initialValues: initialValues
            }

            return (
                <BaseSearch {...baseSearchProps}>
                    {unref(searchColumns).map((column) => {
                        const { fieldProps, formItemProps } = column
                        const namePath = column.dataIndex || column.key

                        const needFormItemProps = {
                            ...formItemProps,
                            name: namePath,
                            label: column.title
                        }
                        const needFieldProps = {
                            ...pick(column, Object.keys(Field.props)),
                            hidden: !!column.hideInSearch,
                            fieldProps: { ...fieldProps, style: { width: '100%' } },
                            formItemProps: needFormItemProps
                        }
                        const key = namePathToString(namePath!)
                        return <Field {...needFieldProps} key={key}/>
                    })}
                </BaseSearch>
            )
        }
    }
})
