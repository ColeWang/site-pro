import type { App, Plugin, Ref, SlotsType } from 'vue'
import { defineComponent, ref, unref } from 'vue'
import type { Recordable } from '@site-pro/utils'
import { useResizeObserver } from '@site-pro/hooks'
import { debounce, head } from 'lodash-es'
import type { ResizeObserverRectSize, ResizeObserverSlots } from './typings'
import { resizeObserverProps } from './typings'

const ResizeObserver = defineComponent({
    inheritAttrs: false,
    name: 'ProResizeObserver',
    props: resizeObserverProps(),
    slots: Object as SlotsType<ResizeObserverSlots>,
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
            const slotProps: Recordable = { size: unref(rectSize) }

            return (
                <div {...attrs} ref={elRef}>
                    {slots.default && slots.default(slotProps)}
                </div>
            )
        }
    }
})

ResizeObserver.install = function (app: App): App {
    app.component(ResizeObserver.name as string, ResizeObserver)
    return app
}

export default ResizeObserver as typeof ResizeObserver & Plugin
