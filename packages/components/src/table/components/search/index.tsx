import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import type { BaseAttrs, NamePath, Recordable } from '@site-pro/utils'
import { isEmpty, namePathToString } from '@site-pro/utils'
import { pick, reduce, set } from 'lodash-es'
import type { BaseSearchProps } from './BaseSearch'
import BaseSearch, { baseSearchProps } from './BaseSearch'
import type { TableColumn } from '../../typings'
import type { BaseFieldFormItemProps } from '../../../base-field'
import type { FieldProps } from '../../../form'
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

export type SearchProps = Partial<ExtractPropTypes<ReturnType<typeof searchProps>>>;
export type SearchInstance = ComponentPublicInstance<SearchProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableSearch',
    props: searchProps(),
    slots: Object as SlotsType<{
        default?: any;
    }>,
    setup (props, { attrs }) {
        const defaultColumns: TableColumn[] = filterSearchColumns(props.columns)
        const initialValues: Recordable = reduce(defaultColumns, (result, column) => {
            const namePath: NamePath = column.dataIndex || column.key as string
            if (namePath && !isEmpty(column.initialValue)) {
                return set(result, namePath, column.initialValue)
            }
            return result
        }, {})

        const searchColumns: ComputedRef<TableColumn[]> = computed(() => filterSearchColumns(props.columns))

        return () => {
            const baseSearchProps: BaseSearchProps & BaseAttrs = {
                ...attrs,
                ...pick(props, Object.keys(BaseSearch.props)),
                initialValues: initialValues
            }

            return (
                <BaseSearch {...baseSearchProps}>
                    {unref(searchColumns).map((column) => {
                        const { fieldProps, formItemProps } = column
                        const namePath: NamePath = column.dataIndex || column.key as string

                        const needFormItemProps: BaseFieldFormItemProps = {
                            ...formItemProps,
                            name: namePath,
                            label: column.title
                        }
                        const needFieldProps: FieldProps = {
                            ...pick(column, Object.keys(Field.props)) as FieldProps,
                            hidden: !!column.hideInSearch,
                            fieldProps: { ...fieldProps, style: { width: '100%' } },
                            formItemProps: needFormItemProps
                        }
                        const key: string = namePathToString(namePath!)
                        return <Field {...needFieldProps} key={key}/>
                    })}
                </BaseSearch>
            )
        }
    }
})
