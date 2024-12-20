import type { Ref, WatchStopHandle } from 'vue'
import { ref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import type { ResizeObserverRectSize } from '../../resize-observer'
import type { QueryFilterBreakPoint, QueryFilterLayout, QueryFilterProps } from '../typings'

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

type BreakPointsConfig = Record<QueryFilterLayout, QueryFilterBreakPoint[]>;

interface GetBreakPointConfigResult {
    layout: QueryFilterLayout;
    span: number;
}

interface UseBreakPointResult {
    layout: Ref<QueryFilterLayout>;
    span: Ref<number>;
}

const BREAK_POINTS_CONFIG: BreakPointsConfig = {
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

const COMPACT_BREAK_POINTS_CONFIG: BreakPointsConfig = {
    horizontal: [
        [452, 24, 'vertical'],
        [684, 12, 'horizontal'],
        [916, 8, 'horizontal'],
        [1380, 6, 'horizontal'],
        [Infinity, 4, 'horizontal']
    ],
    vertical: [
        [452, 24, 'vertical'],
        [684, 12, 'vertical'],
        [916, 8, 'vertical'],
        [1380, 6, 'vertical'],
        [Infinity, 4, 'vertical']
    ]
}

function getBreakPointConfig (width: number, props: QueryFilterProps): GetBreakPointConfigResult {
    const { compact, layout, breakPoints: propsBreakPoints } = props

    const breakPointsConfig: BreakPointsConfig = compact ? COMPACT_BREAK_POINTS_CONFIG : BREAK_POINTS_CONFIG

    const breakPoints: QueryFilterBreakPoint[] = propsBreakPoints || breakPointsConfig[layout || 'horizontal']
    const breakPoint: QueryFilterBreakPoint = breakPoints.find((item) => width < item[0])!
    return { span: breakPoint[1], layout: breakPoint[2] }
}

function useBreakPoint (
    size: Ref<ResizeObserverRectSize>,
    props: QueryFilterProps
): UseBreakPointResult {
    const span: Ref<number> = ref(24)
    const layout: Ref<QueryFilterLayout> = ref('horizontal')

    const stopWatchSize: WatchStopHandle = watch(size, (value) => {
        const result: GetBreakPointConfigResult = getBreakPointConfig(value.width, props)
        // ---
        span.value = result.span || 24
        layout.value = result.layout || 'horizontal'
    })

    tryOnScopeDispose(() => {
        stopWatchSize && stopWatchSize()
    })

    return { layout, span }
}

export default useBreakPoint
