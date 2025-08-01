import type { Ref, WatchStopHandle } from 'vue'
import { ref, unref, watch } from 'vue'
import type { Recordable } from '@site-pro/utils'
import tryOnScopeDispose from './tryOnScopeDispose'
import type { BreakPointConfig, BreakPointLayout, BreakPointTuple } from './breakPointConfig'
import { BREAK_POINT_CONFIG, COMPACT_BREAK_POINT_CONFIG } from './breakPointConfig'

interface ResizeObserverRectSize extends Partial<DOMRectReadOnly> {
    width: number;
    height: number;
}

export interface BreakPointOptions extends Recordable {
    compact?: boolean;
    layout?: BreakPointLayout;
    breakPointConfig?: BreakPointConfig;
}

export interface GetBreakPointConfigResult {
    layout: BreakPointLayout;
    span: number;
}

export interface UseBreakPointResult {
    layout: Ref<BreakPointLayout>;
    span: Ref<number>;
}

function getBreakPointConfig (width: number, options?: BreakPointOptions): GetBreakPointConfigResult {
    const { compact, layout, breakPointConfig } = options || {}

    const needConfig: BreakPointConfig = compact ? COMPACT_BREAK_POINT_CONFIG : BREAK_POINT_CONFIG
    const needLayout: BreakPointLayout = layout || 'horizontal'

    const tuples: BreakPointTuple[] = breakPointConfig ? breakPointConfig[needLayout] : needConfig[needLayout]
    const breakPointTuple: BreakPointTuple = tuples.find((item) => width < item[0])!

    return { span: breakPointTuple[1], layout: breakPointTuple[2] }
}

function useBreakPoint (size: Ref<ResizeObserverRectSize>, options?: BreakPointOptions | Ref<BreakPointOptions>): UseBreakPointResult {
    const span: Ref<number> = ref(24)
    const layout: Ref<BreakPointLayout> = ref('horizontal')

    const stopWatchSize: WatchStopHandle = watch(size, (value) => {
        const result: GetBreakPointConfigResult = getBreakPointConfig(value.width, unref(options))
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
