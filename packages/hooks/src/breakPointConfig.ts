export type BreakPointLayout = 'vertical' | 'horizontal';
export type BreakPointTuple = [number, number, BreakPointLayout];
export type BreakPointConfig = Record<BreakPointLayout, BreakPointTuple[]>

export const BREAK_POINT_CONFIG: BreakPointConfig = {
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

export const COMPACT_BREAK_POINT_CONFIG: BreakPointConfig = {
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
