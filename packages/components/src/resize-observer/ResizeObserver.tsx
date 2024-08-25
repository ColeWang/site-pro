import type { Ref, SlotsType } from 'vue'
import { defineComponent, ref, unref } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import { useResizeObserver } from '@site-pro/hooks'
import { debounce, head } from 'lodash-es'
import type { RectSizeType } from './typings'
import { resizeObserverProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProResizeObserver',
    props: resizeObserverProps(),
    slots: Object as SlotsType<{
        default?: BaseSlot;
    }>,
    emits: ['resize'],
    setup (props, { emit, slots, attrs }) {
        const elRef: Ref<Element | null> = ref(null)

        const rectSize: Ref<RectSizeType> = ref({ width: 0, height: 0 })

        function setRectSize (size: RectSizeType) {
            rectSize.value = size
            emit('resize', size)
        }

        function onResizeCallback (entries: ResizeObserverEntry[]): void {
            const { contentRect } = head(entries) || {}
            setRectSize(contentRect || { width: 0, height: 0 })
        }

        const debounceCallback = debounce(onResizeCallback, props.debounce, { leading: true })

        useResizeObserver(elRef, debounceCallback)

        return () => {
            const slotScope: any = { size: unref(rectSize) }
            const children = slots.default && slots.default(slotScope)

            return (
                <div {...attrs} ref={elRef}>
                    {children}
                </div>
            )
        }
    }
})
