import type { App } from 'vue'
import ResizeObserver from './ResizeObserver'
import { resizeObserverProps } from './typings'

ResizeObserver.install = function (app: App): App {
    app.component(ResizeObserver.name as string, ResizeObserver)
    return app
}

export { ResizeObserver, resizeObserverProps }
export type { RectSizeType, ResizeObserverProps, ResizeObserverInstance } from './typings'
