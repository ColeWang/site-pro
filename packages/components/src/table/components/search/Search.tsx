import type { ComputedRef, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import type { BaseAttrs, NamePath } from '@site-pro/utils'
import { namePathToString, safeDestructureObject } from '@site-pro/utils'
import { pick } from 'lodash-es'
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

export default defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProTableSearch',
    props: searchProps(),
    slots: Object as SlotsType<SearchSlots>,
    setup (props, { attrs }) {
        const sColumns: ComputedRef<TableColumn[]> = computed(() => {
            return filterSearchColumns(props.columns)
        })

        return () => {
            const baseSearchProps: BaseSearchProps & BaseAttrs = {
                ...pick(props, Object.keys(BaseSearch.props)) as BaseSearchProps,
                ...attrs
            }

            const children: VNodeChild = unref(sColumns).map((column) => {
                const namePath: NamePath = column.dataIndex || column.key as string
                const key: string = namePathToString(namePath!)

                const needFormItemProps: BaseFieldFormItemProps = {
                    ...safeDestructureObject(column.formItemProps),
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
