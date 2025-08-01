import version from './version'
// --
import tryOnScopeDispose from './tryOnScopeDispose'
import type { UseConfigInjectResult } from './useConfigInject'
import useConfigInject from './useConfigInject'
import useGlobalProperties from './useGlobalProperties'
import type { UseResizeObserverResult } from './useResizeObserver'
import useResizeObserver from './useResizeObserver'
import type { UseRefsResult } from './useRefs'
import useRefs from './useRefs'
import type { BreakPointOptions, UseBreakPointResult } from './useBreakPoint'
import useBreakPoint from './useBreakPoint'
import type { BreakPointConfig, BreakPointLayout, BreakPointTuple } from './breakPointConfig'

export { version }

export { tryOnScopeDispose }
export { useConfigInject }
export { useGlobalProperties }
export { useResizeObserver }
export { useRefs }
export { useBreakPoint }

export type { UseConfigInjectResult }
export type { UseResizeObserverResult }
export type { UseRefsResult }
export type { BreakPointOptions, UseBreakPointResult }

export type { BreakPointLayout, BreakPointTuple, BreakPointConfig }
