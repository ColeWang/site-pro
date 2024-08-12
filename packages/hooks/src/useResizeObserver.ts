import type { ComponentPublicInstance, Ref } from 'vue'
import { computed, watch } from 'vue'
import { getElement } from '@site-pro/utils'
import tryOnScopeDispose from './tryOnScopeDispose'

function useResizeObserver (
    target: Element | Ref<Element | ComponentPublicInstance | null>,
    callback: ResizeObserverCallback,
    options?: ResizeObserverOptions
): void {
    let observer: ResizeObserver | null = null

    function cleanup () {
        observer && observer.disconnect()
        observer = null
    }

    const elTarget = computed(() => getElement(target))

    const stopWatch = watch(elTarget, (el) => {
        cleanup()
        if (window && 'ResizeObserver' in window) {
            observer = new ResizeObserver(callback)
            el && observer.observe(el, options)
        }
    }, { immediate: true, flush: 'post', deep: true })

    function onStopHandle () {
        stopWatch && stopWatch()
        cleanup()
    }

    tryOnScopeDispose(onStopHandle)
}

export default useResizeObserver
