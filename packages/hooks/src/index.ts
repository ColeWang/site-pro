import useConfigInject from './useConfigInject'
import tryOnScopeDispose from './tryOnScopeDispose'
import useGlobalProperties from './useGlobalProperties'
import useResizeObserver from './useResizeObserver'

export const version: string = __VERSION__

export {
    tryOnScopeDispose,
    useConfigInject,
    useGlobalProperties,
    useResizeObserver
}
