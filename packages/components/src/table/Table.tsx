import type { App, ComputedRef, CSSProperties, Plugin, Ref, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, onMounted, ref, unref, watch } from 'vue'
import {
    Card as AntCard,
    ConfigProvider as AntConfigProvider,
    Table as AntTable,
    theme as antTheme
} from 'ant-design-vue'
import type { BaseSlot, NamePath, Recordable } from '@site-pro/utils'
import { getElement, getSlot, getSlotVNode, omitNil, safeDestructureObject, toPx } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { isArray, isFunction, isObject, omit, pick, reduce, update } from 'lodash-es'
import type { SearchProps } from './components/search'
import { Search } from './components/search'
import { Extra } from './components/extra'
import type { ToolbarProps } from './components/toolbar'
import { Toolbar } from './components/toolbar'
import type { AlertProps } from './components/alert'
import { Alert } from './components/alert'
import useFetchData from './hooks/useFetchData'
import useTableColumns from './hooks/useTableColumns'
import useRowSelection from './hooks/useRowSelection'
import { createSharedContext } from './hooks/useSharedContext'
import type {
    TableAction,
    TableCurrentDataSource,
    TableFilterValue,
    TablePagination,
    TableProps as AntTableProps,
    TableSorterResult,
    TableSortOrder
} from '../ant-typings'
import type { TableColumn, TableSize, TableSlots } from './typings'
import { tableProps } from './typings'
import useStyle from './style'

const Table = defineComponent({
    inheritAttrs: false,
    name: 'ProTable',
    props: tableProps(),
    slots: Object as SlotsType<TableSlots>,
    emits: ['change', 'paginateChange', 'filterChange', 'sortChange', 'loadingChange', 'export', 'columnsChange', 'load', 'requestError', 'finish', 'reset'],
    setup (props, { emit, slots, attrs, expose }) {
        const OMIT_SLOTS_KEYS: string[] = ['search', 'extra', 'title', 'actions', 'settings', 'alert', 'alertOptions']

        const { prefixCls } = useConfigInject('pro-table', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = antTheme.useToken()

        const popupContainer: Ref<HTMLElement | null> = ref(null)
        const tableRef: Ref<HTMLElement | null> = ref(null)

        const tableSize: Ref<TableSize> = ref(props.size)

        const {
            context: requestProps,
            setPaginate,
            getParams,
            setParams,
            onReload
        } = useFetchData(props.request, props, {
            onLoad: (dataSource: any[]) => emit('load', dataSource),
            onRequestError: (err: Error) => emit('requestError', err)
        })

        const { columns, columnsMap, assignColumnsMap, nullifyColumnsMap } = useTableColumns(props)
        const { rowSelection, selectedRows, onCleanSelected } = useRowSelection(props)

        const tableColumns: ComputedRef<TableColumn[]> = computed(() => {
            return unref(columns).filter((column) => column.checked)
        })

        watch(() => requestProps.loading, (value) => {
            emit('loadingChange', value)
        })

        watch(tableColumns, (value) => {
            emit('columnsChange', value)
        }, { immediate: true })

        // 没搜索的时候 发起请求
        onMounted(() => {
            const ifReload: boolean = !props.manualRequest && props.search === false
            ifReload && onReload(true)
        })

        function onChange (
            paginate: TablePagination,
            filters: Recordable<TableFilterValue>,
            sorter: TableSorterResult | TableSorterResult[],
            extra: TableCurrentDataSource
        ): void {
            emit('change', paginate, filters, sorter, extra)
            const finalAction: Record<TableAction, Function> = {
                paginate: () => {
                    const nextPaginate: TablePagination = pick(paginate, ['current', 'pageSize'])
                    setPaginate(nextPaginate)
                    emit('paginateChange', nextPaginate)
                },
                /* v8 ignore next 3 */
                filter: () => {
                    emit('filterChange', omitNil(filters))
                },
                sort: () => {
                    if (isArray(sorter)) {
                        const data: Recordable<TableSortOrder> = reduce(sorter, (result, value) => {
                            return { ...result, [`${value.field}`]: value.order }
                        }, {})
                        emit('sortChange', omitNil(data))
                    } else {
                        const sorterOfColumn = sorter.column && sorter.column.sorter
                        const isSortByField = sorterOfColumn && sorterOfColumn.toString() === sorterOfColumn
                        const key: string = `${isSortByField ? sorterOfColumn : sorter.field}`
                        const data: Recordable<TableSortOrder> = { [key]: sorter.order! }
                        emit('sortChange', omitNil(data))
                    }
                }
            }
            finalAction[extra.action] && finalAction[extra.action]()
        }

        function transformValues (values: Recordable, columns: TableColumn[]): Recordable {
            const nextValues = reduce(columns, (result, column) => {
                const namePath: NamePath = column.dataIndex || column.key as string
                const transform: ((value: any) => any) | undefined = isObject(column.search)
                    ? column.search.transform
                    : undefined

                return transform ? update(result, namePath, transform) : result
            }, { ...values })

            return omitNil(nextValues)
        }

        function onFinish (values: Recordable): void {
            const nextValues: Recordable = transformValues(values, props.columns)
            if (isFunction(props.beforeSearchSubmit)) {
                const result: Recordable = props.beforeSearchSubmit(nextValues)
                setParams(result || {})
            } else {
                setParams(nextValues)
            }
            emit('finish', nextValues)
        }

        function onReset (values: Recordable): void {
            emit('reset', values)
        }

        // toolbar
        function onExport (): void {
            const params: Recordable = getParams()
            const exportParams: any = {
                dataSource: requestProps.dataSource,
                tableEl: unref(tableRef),
                params: params
            }
            emit('export', exportParams)
        }

        /* v8 ignore next 3 */
        function onSizeChange (size: TableSize): void {
            tableSize.value = size
        }

        function onColumnsMapChange (values?: Recordable<TableColumn>): void {
            if (values) {
                assignColumnsMap(values)
            } else {
                nullifyColumnsMap()
            }
        }

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        createSharedContext({
            requestProps,
            tableSize,
            columns,
            columnsMap,
            onReload,
            onExport,
            onSizeChange,
            onColumnsMapChange
        })

        expose({
            reload: onReload,
            // 提供自定义 search 的触发 request 途径
            finish: onFinish,
            cleanSelected: onCleanSelected
        })

        return () => {
            const { columns: propsColumns, rowSelection: propsRowSelection } = props
            // restProps 去除 title 等
            const {
                manualRequest,
                title: propsTitle,
                search: propsSearch,
                toolbar: propsToolbar,
                ...restProps
            } = props
            const { sizeMS } = unref(token)

            const renderSearch = () => {
                const searchProps: SearchProps = {
                    ...safeDestructureObject(propsSearch),
                    loading: requestProps.loading,
                    columns: propsColumns,
                    manualRequest: manualRequest,
                    onFinish: onFinish,
                    onReset: onReset
                }

                const defaultSearchDom: VNodeChild = <Search {...searchProps}/>

                const customSearchDom: VNodeChild = slots.search && slots.search({
                    props: searchProps,
                    dom: defaultSearchDom
                })

                return customSearchDom || defaultSearchDom
            }

            const renderToolbar = () => {
                const toolbarSlots: Recordable<BaseSlot | undefined> = {
                    actions: getSlot(slots, props, 'actions'),
                    settings: getSlot(slots, props, 'settings')
                }
                const toolbarProps: ToolbarProps = {
                    ...safeDestructureObject(propsToolbar),
                    title: propsTitle
                }
                return <Toolbar {...toolbarProps} v-slots={toolbarSlots}/>
            }

            const renderAlert = () => {
                const alertSlots: Recordable<BaseSlot | undefined> = {
                    default: getSlot(slots, props, 'alert'),
                    options: getSlot(slots, props, 'alertOptions')
                }
                const alertProps: AlertProps = {
                    selectedRowKeys: rowSelection.selectedRowKeys,
                    selectedRows: unref(selectedRows),
                    onCleanSelected: onCleanSelected
                }
                return <Alert {...alertProps} v-slots={alertSlots}/>
            }

            const extraDom: VNodeChild = getSlotVNode(slots, props, 'extra', requestProps)

            const needTableProps: AntTableProps = {
                ...pick(restProps, Object.keys(Table.props)) as AntTableProps,
                ...requestProps,
                size: unref(tableSize),
                columns: unref(tableColumns),
                rowSelection: propsRowSelection !== false ? rowSelection : undefined,
                onChange: onChange as any
            }

            const needTableSlots: Recordable<BaseSlot> = omit(slots, OMIT_SLOTS_KEYS)

            const defaultTableDom: VNodeChild = <AntTable {...needTableProps} v-slots={needTableSlots}/>

            const customTableDom: VNodeChild = getSlotVNode(slots, props, 'table', {
                props: needTableProps,
                dom: defaultTableDom
            })

            const cardBodyStyle: CSSProperties = propsToolbar !== false ? ({
                paddingBlock: toPx(sizeMS),
                paddingBlockStart: '0'
            }) : ({
                paddingBlock: toPx(sizeMS)
            })

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    {propsSearch !== false && renderSearch()}
                    {extraDom && <Extra>{extraDom}</Extra>}
                    <AntCard bodyStyle={cardBodyStyle}>
                        {propsToolbar !== false && renderToolbar()}
                        {propsRowSelection !== false && renderAlert()}
                        <AntConfigProvider getPopupContainer={getPopupContainer}>
                            <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                                <div class={`${prefixCls.value}-container`} ref={tableRef}>
                                    {customTableDom || defaultTableDom}
                                </div>
                            </div>
                        </AntConfigProvider>
                    </AntCard>
                </div>
            )
        }
    }
})

Table.install = function (app: App): App {
    app.component(Table.name as string, Table)
    return app
}

export default Table as typeof Table & Plugin
