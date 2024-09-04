import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import type { ResizeObserverRectSize } from '../../resize-observer'
import type { QueryFilterLayout, QueryFilterProps } from '../typings'

// 254px 16px
// 210px 12px

// (254 + 16) * 2 - 16 = 524 + 12 * 2 = 548
// (254 + 16) * 3 - 16 = 794 + 12 * 3 = 830
// (254 + 16) * 4 - 16 = 1064 + 12 * 4 = 1112
// (254 + 16) * 6 - 16 = 1604 + 12 * 6 = 1676

// (210 + 12) * 2 - 12 = 432 + 10 * 2 = 452
// (210 + 12) * 3 - 12 = 654 + 10 * 3 = 684
// (210 + 12) * 4 - 12 = 876 + 10 * 4 = 916
// (210 + 12) * 6 - 12 = 1320 + 10 * 6 = 1380

type BreakpointType = [number, number, QueryFilterLayout];

interface SpanConfigType {
    layout: QueryFilterLayout;
    span: number;
}

const BREAKPOINTS: Record<QueryFilterLayout, BreakpointType[]> = {
    horizontal: [
        [558, 24, 'vertical'],
        [830, 12, 'horizontal'],
        [1112, 8, 'horizontal'],
        [1676, 6, 'horizontal'],
        [Infinity, 4, 'horizontal']
    ],
    vertical: [
        [558, 24, 'vertical'],
        [830, 12, 'vertical'],
        [1112, 8, 'vertical'],
        [1676, 6, 'vertical'],
        [Infinity, 4, 'vertical']
    ]
}

function getBreakpoint (layout: QueryFilterLayout, compact: boolean): BreakpointType[] {
    if (compact) {

    }
}

function getSpanConfig (width: number, breakpoints: BreakpointType[]): SpanConfigType {
    const breakPoint: BreakpointType = breakpoints.find((item) => width < item[0])!
    return { span: breakPoint[1], layout: breakPoint[2] }
}

function useSpanConfig (size: Ref<ResizeObserverRectSize>, props: QueryFilterProps) {
    const layout: Ref<QueryFilterLayout> = ref('horizontal')
    const span: Ref<number> = ref(24)

    const stopWatchSize = watch(size, (value) => {
        const breakpoints: BreakpointType[] = getBreakpoint(props.layout!, props.compact!)
        const spanConfig: SpanConfigType = getSpanConfig(value.width, breakpoints, props.span)
        // ---
        layout.value = spanConfig.layout || 'horizontal'
        span.value = spanConfig.span || 24
    })

    function onStopHandle (): void {
        stopWatchSize && stopWatchSize()
    }

    tryOnScopeDispose(onStopHandle)

    return { layout, span }
}

export default useSpanConfig
