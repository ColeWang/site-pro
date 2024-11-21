import type { App, Ref, SlotsType, VNodeChild } from 'vue'
import { defineComponent, ref, unref } from 'vue'
import { useResizeObserver } from '@site-pro/hooks'
import { debounce, head } from 'lodash-es'
import type { ResizeObserverRectSize } from './typings'
import { resizeObserverProps } from './typings'

const ResizeObserver = defineComponent({
    inheritAttrs: false,
    name: 'ProResizeObserver',
    props: resizeObserverProps(),
    slots: Object as SlotsType<{
        default?: { size: ResizeObserverRectSize };
    }>,
    emits: ['resize'],
    setup (props, { emit, slots, attrs }) {
        const elRef: Ref<HTMLElement | null> = ref(null)

        const rectSize: Ref<ResizeObserverRectSize> = ref({ width: 0, height: 0 })

        function setRectSize (size: ResizeObserverRectSize): void {
            rectSize.value = size
            emit('resize', size)
        }

        function onResizeCallback (entries: ResizeObserverEntry[]): void {
            const { contentRect } = head(entries) || {}
            setRectSize(contentRect || { width: 0, height: 0 })
        }

        const debounceCallback: ResizeObserverCallback = debounce(onResizeCallback, props.debounce, { leading: true })

        useResizeObserver(elRef, debounceCallback)

        return () => {
            const slotScope: any = { size: unref(rectSize) }
            const children: VNodeChild = slots.default && slots.default(slotScope)

            return (
                <div {...attrs} ref={elRef}>
                    {children}
                </div>
            )
        }
    }
})

ResizeObserver.install = function (app: App): App {
    app.component(ResizeObserver.name as string, ResizeObserver)
    return app
}

export default ResizeObserver
