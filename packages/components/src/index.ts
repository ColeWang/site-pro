import type { App, Plugin } from 'vue'
import version from './version'
import * as components from './components'

function install (app: App): App {
    Object.keys(components).forEach((key) => {
        const comp: Plugin = (components as Record<string, Plugin>)[key]
        if (comp && comp.install) {
            app.use(comp)
        }
    })
    return app
}

export { version }
export { install }

export * from './theme'
export * from './components'

export default { version, install }
