import type { Ref, WatchStopHandle } from 'vue'
import { shallowReactive, shallowRef, unref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import { isEqual, isFunction, pick } from 'lodash-es'
import { useLocaleReceiver } from '../../locale'
import type { TablePagination } from '../../ant-typings'
import type { TableProps, TableRequest } from '../typings'

export interface UseFetchDataContext {
    loading: boolean;
    dataSource: any[];
    pagination: TablePagination | false;
}

interface UseFetchDataOptions {
    onLoad?: (dataSource: any[]) => void;
    onRequestError?: (err: Error) => void;
}

interface UseFetchDataResult {
    context: UseFetchDataContext;
    onReload: (resetCurrent?: boolean) => void;
    setPaginate: (paginate: TablePagination | false) => void;
    setParams: (params: Recordable) => void;
    getParams: () => Recordable;
}

function mergePagination (
    pagination: TablePagination | false | undefined,
    defaultShowTotal: TablePagination['showTotal']
): TablePagination | false {
    if (pagination === false) return false
    const { current, pageSize, showTotal, total, showSizeChanger } = pagination || {}
    const basePaginate: TablePagination = {
        total: total || 0,
        current: current || 1,
        pageSize: pageSize || 10,
        showSizeChanger: showSizeChanger !== false,
        showTotal: showTotal || defaultShowTotal
    }
    return { ...pagination, ...basePaginate }
}

function validatePaginate (paginate: Required<TablePagination>): TablePagination {
    const { current, pageSize, total } = paginate
    const maxCurrent: number = Math.ceil(total / pageSize)
    const overflow: boolean | 0 = total && current > maxCurrent
    const nextCurrent: number = overflow ? maxCurrent : current
    return { ...paginate, current: nextCurrent }
}

function useFetchData (
    request: TableRequest | undefined,
    props: TableProps,
    options?: UseFetchDataOptions
): UseFetchDataResult {
    const { t } = useLocaleReceiver(['Table', 'pagination'])
    const { onLoad, onRequestError } = options || {}

    const defaultShowTotal = (total: number, range: [number, number]) => {
        return `${t('range')} ${range[0]}-${range[1]} ${t('total')} ${total} ${t('item')}`
    }

    const context: UseFetchDataContext = shallowReactive({
        loading: false,
        dataSource: props.dataSource || [],
        pagination: mergePagination(props.pagination, defaultShowTotal)
    })

    const sParams: Ref<Recordable> = shallowRef({})

    const stopWatchDataSource: WatchStopHandle = watch(() => props.dataSource, (value) => {
        // 手动请求时 更新 dataSource
        context.dataSource = value || []
    }, { immediate: true })

    const stopWatchPagination: WatchStopHandle = watch(() => context.pagination, (value, oldValue) => {
        if (value && oldValue && (value.current !== oldValue.current || value.pageSize !== oldValue.pageSize)) {
            oldValue.pageSize !== value.pageSize && setPaginate({ current: 1 })
            fetchData()
        }
    })

    const stopWatchParams: WatchStopHandle = watch([() => props.params, sParams], (current, previous) => {
        if (!isEqual(current, previous)) {
            setPaginate({ current: 1 })
            fetchData()
        }
    })

    async function fetchData (): Promise<void> {
        if (!isFunction(request) || context.loading) return
        context.loading = true
        try {
            const params: Recordable = { ...unref(sParams), ...props.params }
            const paginate: TablePagination | false = pick(context.pagination, ['current', 'pageSize'])
            const { success, data, total } = await request(params, paginate)
            if (success !== false) {
                // postData 不应导致 data 的长度变化, total
                if (props.postData && isFunction(props.postData)) {
                    const nextData: any[] = props.postData(data, params, paginate)
                    context.dataSource = nextData || []
                    onLoad && onLoad(nextData)
                } else {
                    context.dataSource = data || []
                    onLoad && onLoad(data)
                }
                setPaginate({ total: total || data.length })
            }
        } catch (err: unknown) {
            if (!onRequestError) throw new Error(err as string)
            onRequestError && onRequestError(err as Error)
        } finally {
            context.loading = false
        }
    }

    function setPaginate (paginate: TablePagination | false): void {
        if (context.pagination === false) return
        const needPaginate: TablePagination = { ...context.pagination, ...paginate }
        context.pagination = validatePaginate(needPaginate as Required<TablePagination>)
    }

    function getParams (): Recordable {
        return { ...unref(sParams), ...props.params }
    }

    function setParams (params: Recordable): void {
        sParams.value = params
    }

    function onReload (resetCurrent: boolean = false): void {
        resetCurrent && setPaginate({ current: 1 })
        fetchData()
    }

    function onStopHandle (): void {
        stopWatchDataSource && stopWatchDataSource()
        stopWatchPagination && stopWatchPagination()
        stopWatchParams && stopWatchParams()
    }

    tryOnScopeDispose(onStopHandle)

    return { context, onReload, setPaginate, setParams, getParams }
}

export default useFetchData
