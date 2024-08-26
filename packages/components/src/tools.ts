import type { App, Plugin } from 'vue'

export function withInstall<T> (component: T): T & Plugin {
    const comp = component as any
    comp.install = (app: App) => {
        app.component(comp.displayName || comp.name, comp)
        return app
    }
    return comp as T & Plugin
}
