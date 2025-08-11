import type { ComputedRef, Ref, WatchStopHandle } from 'vue'
import { computed, watch } from 'vue'
import type { BaseRefType } from '@site-pro/utils'
import { getElement, isBrowserClient } from '@site-pro/utils'
import tryOnScopeDispose from './tryOnScopeDispose'

export interface UseResizeObserverResult {
    stop: () => void;
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

    const stopWatchElTarget: WatchStopHandle = watch(elTarget, (el) => {
        cleanup()
        if (isBrowserClient && window.ResizeObserver) {
            observer = new ResizeObserver(callback)
            el && observer.observe(el, options)
        }
    }, { immediate: true, flush: 'post', deep: true })

    function onStopHandle (): void {
        stopWatchElTarget && stopWatchElTarget()
        // --
        cleanup()
    }

    tryOnScopeDispose(onStopHandle)

    return { stop: onStopHandle }
}

export default useResizeObserver
