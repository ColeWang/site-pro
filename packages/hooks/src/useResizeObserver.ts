import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'
import { computed, watch } from 'vue'
import { getElement } from '@site-pro/utils'
import tryOnScopeDispose from './tryOnScopeDispose'

function useResizeObserver (
    target: Element | Ref<Element | ComponentPublicInstance | null>,
    callback: ResizeObserverCallback,
    options?: ResizeObserverOptions
): void {
    let observer: ResizeObserver | null = null

    function cleanup (): void {
        observer && observer.disconnect()
        observer = null
    }

    const elTarget: ComputedRef<HTMLElement> = computed(() => getElement(target))

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
}

export default useResizeObserver
