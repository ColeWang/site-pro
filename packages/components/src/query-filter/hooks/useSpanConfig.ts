import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import type { ResizeObserverRectSize } from '../../resize-observer'
import type { QueryFilterLayout, QueryFilterProps, QueryFilterSpanConfig } from '../typings'

const breakpoints: Record<string, any[]> = {
    horizontal: [
        [556, 24, 'vertical'],
        [834, 12, 'horizontal'],
        [1112, 8, 'horizontal'],
        [Infinity, 6, 'horizontal']
    ],
    vertical: [
        [556, 24, 'vertical'],
        [834, 12, 'vertical'],
        [1112, 8, 'vertical'],
        [Infinity, 6, 'vertical']
    ]
}

// compact 紧凑模式

function getSpanConfig (layout: string, width: number): QueryFilterSpanConfig {
    const spanConfig = breakpoints[layout || 'horizontal']
    const breakPoint = spanConfig.find((item) => width < item[0])
    return { span: breakPoint[1], layout: breakPoint[2] }
}

function useSpanConfig (size: Ref<ResizeObserverRectSize>, props: QueryFilterProps) {
    const { getSpanConfig: propsGetSpanConfig } = props

    // vertical horizontal 只有两种
    const layout: Ref<QueryFilterLayout> = ref('horizontal')
    const span: Ref<number> = ref(24)

    const stopWatchSize = watch(size, ({ width }) => {
        const spanConfig = propsGetSpanConfig
            ? propsGetSpanConfig(props.layout!, width)
            : getSpanConfig(props.layout!, width)
        // ---
        layout.value = spanConfig.layout || 'horizontal'
        span.value = spanConfig.span || 24
    })

    function onStopHandle () {
        stopWatchSize && stopWatchSize()
    }

    tryOnScopeDispose(onStopHandle)

    return { layout, span }
}

export default useSpanConfig
