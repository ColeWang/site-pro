import { computed, defineComponent, unref } from 'vue'
import { namePathToString, isEmpty } from '@site-pro/utils'
import { pick, reduce, set } from 'lodash-es'
import BaseSearch from './BaseSearch'
import { Field } from '../../../form'

function filterSearchColumns (columns) {
    return columns.filter((column) => column.search)
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseSearch.props,
        columns: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, { attrs }) {
        const defaultColumns = filterSearchColumns(props.columns)
        const initialValues = reduce(defaultColumns, (result, column) => {
            const namePath = column.dataIndex || column.key
            if (namePath && !isEmpty(column.initialValue)) {
                return set(result, namePath, column.initialValue)
            }
            return result
        }, {})

        const searchColumns = computed(() => filterSearchColumns(props.columns))

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
                        const key = namePathToString(namePath)
                        return <Field {...needFieldProps} key={key}/>
                    })}
                </BaseSearch>
            )
        }
    }
})
