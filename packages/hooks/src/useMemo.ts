import type { Ref, WatchSource, WatchStopHandle } from 'vue'
import { ref, watch } from 'vue'
import tryOnScopeDispose from './tryOnScopeDispose'

interface UseMemoOptions {
    shouldUpdate?: (prev: Array<any>, next: Array<any>) => boolean;
    immediate?: boolean;
    deep?: boolean;
}

type UseMemoCondition = (WatchSource | object)[];

function useMemo<T> (getValue: () => T, condition: UseMemoCondition, options?: UseMemoOptions): Ref<T> {
    const { shouldUpdate, immediate, deep } = options || {}

    const initialValue: any = getValue()
    const cache: Ref<T> = ref(initialValue)

    function callback (next: any, pre: any): void {
        if (!shouldUpdate || shouldUpdate(next, pre)) {
            cache.value = getValue()
        }
    }

    const stopWatch: WatchStopHandle = watch(condition, callback, {
        immediate: immediate || false,
        deep: deep || false,
    })

    function onStopHandle (): void {
        stopWatch && stopWatch()
    }

    tryOnScopeDispose(onStopHandle)

    return cache
}

export default useMemo
