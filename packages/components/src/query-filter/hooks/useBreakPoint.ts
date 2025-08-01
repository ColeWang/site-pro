import type { Ref, WatchStopHandle } from 'vue'
import { ref, unref, watch } from 'vue'
import type { Recordable } from '@site-pro/utils'
import { tryOnScopeDispose } from '@site-pro/hooks'
import type { ResizeObserverRectSize } from '../../resize-observer'
import type { QueryFilterLayout } from '../typings'

export type UseBreakPointTuple = [number, number, QueryFilterLayout];
export type UseBreakPointConfig = Record<QueryFilterLayout, UseBreakPointTuple[]>

export const BREAK_POINT_CONFIG: UseBreakPointConfig = {
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

export const COMPACT_BREAK_POINT_CONFIG: UseBreakPointConfig = {
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

export interface GetBreakPointConfigResult {
    layout: QueryFilterLayout;
    span: number;
}

export interface UseBreakPointOptions extends Recordable {
    compact?: boolean;
    layout?: QueryFilterLayout;
    breakPointConfig?: UseBreakPointConfig;
}

export interface UseBreakPointResult {
    layout: Ref<QueryFilterLayout>;
    span: Ref<number>;
}

function getBreakPointConfig (width: number, options?: UseBreakPointOptions): GetBreakPointConfigResult {
    const { compact, layout, breakPointConfig } = options || {}

    const needConfig: UseBreakPointConfig = compact ? COMPACT_BREAK_POINT_CONFIG : BREAK_POINT_CONFIG
    const needLayout: QueryFilterLayout = layout || 'horizontal'

    const tuples: UseBreakPointTuple[] = breakPointConfig ? breakPointConfig[needLayout] : needConfig[needLayout]
    const tuple: UseBreakPointTuple = tuples.find((item) => width < item[0])!

    return { span: tuple[1], layout: tuple[2] }
}

function useBreakPoint (size: Ref<ResizeObserverRectSize>, options?: UseBreakPointOptions | Ref<UseBreakPointOptions>): UseBreakPointResult {
    const layout: Ref<QueryFilterLayout> = ref('horizontal')
    const span: Ref<number> = ref(24)

    const stopWatchSize: WatchStopHandle = watch(size, (value) => {
        const result: GetBreakPointConfigResult = getBreakPointConfig(value.width, unref(options))
        layout.value = result.layout || 'horizontal'
        span.value = result.span || 24
    })

    tryOnScopeDispose(() => {
        stopWatchSize && stopWatchSize()
    })

    return { layout, span }
}

export default useBreakPoint
