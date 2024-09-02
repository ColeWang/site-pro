import type { ComputedRef, Ref } from 'vue'
import { computed, watch } from 'vue'
import type { BaseRefType } from '@site-pro/utils'
import { getElement } from '@site-pro/utils'
import tryOnScopeDispose from './tryOnScopeDispose'

export interface UseResizeObserverResult {
    onStop: () => void;
}

function useResizeObserver (
    target: BaseRefType | Ref<BaseRefType>,
    callback: ResizeObserverCallback,
    options?: ResizeObserverOptions
): UseResizeObserverResult {
    let observer: ResizeObserver | null = null

    function cleanup (): void {
        observer && observer.disconnect()
        observer = null
    }

    const elTarget: ComputedRef<HTMLElement | null> = computed(() => getElement(target))

    const stopWatch = watch(elTarget, (el) => {
        cleanup()
        if (window && 'ResizeObserver' in window) {
            observer = new ResizeObserver(callback)
            el && observer.observe(el, options)
        }
    }, { immediate: true, flush: 'post', deep: true })

    function onStopHandle (): void {
        stopWatch && stopWatch()
        cleanup()
    }

    tryOnScopeDispose(onStopHandle)

    return { onStop: onStopHandle }
}

export default useResizeObserver
