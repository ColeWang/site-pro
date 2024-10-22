import type { Ref, SlotsType } from 'vue'
import { computed, defineComponent, onMounted, ref, unref, watch } from 'vue'
import { Card, ConfigProvider, Table, theme } from 'ant-design-vue'
import type {
    Recordable,
    TableAction,
    TableCurrentDataSource,
    TableFilterValue,
    TablePagination,
    TableSorterResult,
    TableSortOrder
} from '@site-pro/utils'
import { getElement, getSlot, getSlotVNode, omitNil } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { isArray, isFunction, omit, pick, reduce, toPlainObject } from 'lodash-es'
import Search from './components/search'
import Extra from './components/extra'
import Toolbar from './components/toolbar'
import Alert from './components/alert'
import useFetchData from './hooks/useFetchData'
import useTableColumns from './hooks/useTableColumns'
import useRowSelection from './hooks/useRowSelection'
import { createSharedContext } from './hooks/useSharedContext'
import type { TableSize, TableSlots } from './typings'
import { tableProps } from './typings'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTable',
    props: tableProps(),
    slots: Object as SlotsType<TableSlots>,
    emits: ['change', 'paginateChange', 'filterChange', 'sortChange', 'loadingChange', 'export', 'sizeChange', 'columnsChange', 'load', 'requestError', 'finish', 'reset'],
    setup (props, { emit, slots, attrs, expose }) {
        const { prefixCls } = useConfigInject('pro-table', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()

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

        const { columns, columnsMap, setColumnsMap } = useTableColumns(props)
        const { rowSelection, onCleanSelected } = useRowSelection(props)

        const tableColumns = computed(() => {
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
            const ifReload = !props.manualRequest && props.search === false
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

        function onFinish (values: Recordable): void {
            const nextValues = omitNil(values)
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

        function onExport (): void {
            const params: Recordable = getParams()
            const exportParams = {
                pageData: requestProps.dataSource,
                tableEl: unref(tableRef),
                params: params
            }
            emit('export', exportParams)
        }

        /* v8 ignore next 4 */
        function setTableSize (value: TableSize): void {
            tableSize.value = value
            emit('sizeChange', value)
        }

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        createSharedContext({
            requestProps,
            tableSize,
            setTableSize,
            columns,
            columnsMap,
            setColumnsMap,
            onReload: onReload
        })

        expose({
            size: tableSize,
            columns: tableColumns,
            reload: onReload,
            cleanSelected: onCleanSelected
        })

        return () => {
            const { search: propsSearch, columns: propsColumns, manualRequest } = props
            const { toolbar: propsToolbar, rowSelection: propsRowSelection } = props
            const { sizeMS } = unref(token)

            const renderSearch = () => {
                const searchProps = {
                    ...toPlainObject(propsSearch),
                    loading: requestProps.loading,
                    columns: propsColumns,
                    manualRequest: manualRequest,
                    onFinish: onFinish,
                    onReset: onReset
                }
                // custom search 只有插槽的形式
                const customSearch = getSlotVNode(slots, {}, 'search', searchProps)
                return customSearch || <Search {...searchProps}/>
            }

            const renderToolbar = () => {
                const toolbarSlots = {
                    title: getSlot(slots, props, 'title'),
                    actions: getSlot(slots, props, 'actions'),
                    settings: getSlot(slots, props, 'settings')
                }
                const toolbarProps = {
                    ...omit(toPlainObject(propsToolbar), ['title', 'actions', 'settings']),
                    onExport: onExport
                }
                return <Toolbar {...toolbarProps} v-slots={toolbarSlots}/>
            }

            const renderAlert = () => {
                const alertSlots = {
                    default: getSlot(slots, props, 'alert'),
                    options: getSlot(slots, props, 'alertOptions')
                }
                const alertProps = {
                    selectedRowKeys: rowSelection.selectedRowKeys,
                    selectedRows: rowSelection.selectedRows,
                    onCleanSelected: onCleanSelected
                }
                return <Alert {...alertProps} v-slots={alertSlots}/>
            }

            const extraDom = getSlotVNode(slots, props, 'extra', {
                pageData: requestProps.dataSource,
                loading: requestProps.loading,
                pagination: requestProps.pagination
            })

            const needTableProps = {
                ...pick(props, Object.keys(Table.props)),
                ...requestProps,
                size: unref(tableSize),
                columns: unref(tableColumns),
                rowSelection: propsRowSelection !== false ? rowSelection : undefined,
                onChange: onChange
            }

            const needTableSlots = omit(slots, ['search', 'extra', 'title', 'actions', 'settings', 'alert', 'alertOptions'])

            const baseTableDom = <Table {...needTableProps} v-slots={needTableSlots}/>

            const tableDom = getSlotVNode(slots, props, 'table', {
                props: needTableProps,
                dom: baseTableDom
            })

            const cardBodyStyle = propsToolbar !== false ? ({
                paddingBlock: `${sizeMS}px`,
                paddingBlockStart: '0'
            }) : ({
                paddingBlock: `${sizeMS}px`
            })

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    {propsSearch !== false && renderSearch()}
                    {extraDom && <Extra>{extraDom}</Extra>}
                    <Card bodyStyle={cardBodyStyle}>
                        {propsToolbar !== false && renderToolbar()}
                        {propsRowSelection !== false && renderAlert()}
                        <ConfigProvider getPopupContainer={getPopupContainer}>
                            <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                                <div class={`${prefixCls.value}-container`} ref={tableRef}>
                                    {tableDom || baseTableDom}
                                </div>
                            </div>
                        </ConfigProvider>
                    </Card>
                </div>
            )
        }
    }
})
