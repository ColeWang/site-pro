import type { ComputedRef, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import type { BaseAttrs, NamePath, Recordable } from '@site-pro/utils'
import { isEmpty, namePathToString, safeDestructureObject } from '@site-pro/utils'
import { pick, reduce, set } from 'lodash-es'
import BaseSearch from './BaseSearch'
import type { BaseFieldFormItemProps } from '../../../base-field'
import type { FieldProps } from '../../../form'
import { Field } from '../../../form'
import type { TableColumn } from '../../typings'
import type { BaseSearchProps, SearchSlots } from './typings'
import { searchProps } from './typings'

function filterSearchColumns (columns: TableColumn[]): TableColumn[] {
    return columns.filter((column) => !!column.search)
}

function genInitialValues (columns: TableColumn[]): Recordable {
    const needColumns: TableColumn[] = filterSearchColumns(columns)

    return reduce(needColumns, (result, column) => {
        const namePath: NamePath = column.dataIndex || column.key as string
        if (namePath && !isEmpty(column.initialValue)) {
            return set(result, namePath, column.initialValue)
        }
        return result
    }, {})
}

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableSearch',
    props: searchProps(),
    slots: Object as SlotsType<SearchSlots>,
    setup (props, { attrs }) {
        const initialValues: Recordable = genInitialValues(props.columns)

        const sColumns: ComputedRef<TableColumn[]> = computed(() => {
            return filterSearchColumns(props.columns)
        })

        return () => {
            const baseSearchProps: BaseSearchProps & BaseAttrs = {
                ...attrs,
                ...pick(props, Object.keys(BaseSearch.props)),
                initialValues: initialValues
            }

            const children: VNodeChild = unref(sColumns).map((column) => {
                const { formItemProps } = column

                const namePath: NamePath = column.dataIndex || column.key as string
                const key: string = namePathToString(namePath!)

                const needFormItemProps: BaseFieldFormItemProps = {
                    ...safeDestructureObject(formItemProps),
                    name: namePath,
                    label: column.title
                }
                const needFieldProps: FieldProps = {
                    ...pick(column, Object.keys(Field.props)) as FieldProps,
                    hidden: !!column.hideInSearch,
                    formItemProps: needFormItemProps
                }

                return <Field {...needFieldProps} key={key}/>
            })

            return (
                <BaseSearch {...baseSearchProps}>
                    {children}
                </BaseSearch>
            )
        }
    }
})
