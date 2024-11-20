import type { WatchStopHandle } from 'vue'
import { shallowReactive, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import type { DescriptionsProps, DescriptionsRequest } from '../typings'

interface UseFetchDataOptions {
    manualRequest?: boolean;
    onLoad?: (dataSource: any[]) => void;
    onRequestError?: (err: Error) => void;
}

interface UseFetchDataContext {
    loading: boolean;
    record: Recordable;
}

interface UseFetchDataResult {
    context: UseFetchDataContext;
    onReload: () => void;
}

function useFetchData (
    request: DescriptionsRequest | undefined,
    props: DescriptionsProps,
    options: UseFetchDataOptions
): UseFetchDataResult {
    const { manualRequest, onLoad, onRequestError } = options || {}

    const context: UseFetchDataContext = shallowReactive({
        loading: false,
        record: props.record || {}
    })

    // 主动发起一次请求
    !manualRequest && fetchData()

    async function fetchData (): Promise<void> {
        if (!isFunction(request) || context.loading) return
        context.loading = true
        try {
            const { success, data } = await request(props.params || {})
            if (success !== false) {
                context.record = data || {}
                onLoad && onLoad(data)
            }
        } catch (err: unknown) {
            if (!onRequestError) throw new Error(err as string)
            onRequestError && onRequestError(err as Error)
        } finally {
            context.loading = false
        }
    }

    const stopWatchRecord: WatchStopHandle = watch(() => props.record, (value) => {
        // 手动请求时 更新 dataSource
        context.record = value || {}
    }, { immediate: true })

    function onReload (): void {
        fetchData()
    }

    function onStopHandle (): void {
        stopWatchRecord && stopWatchRecord()
    }

    tryOnScopeDispose(onStopHandle)

    return { context, onReload }
}

export default useFetchData
