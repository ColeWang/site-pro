import type { App } from 'vue'
import { forIn } from 'lodash-es'
import version from './version'
import * as components from './components'

function install (app: App): App {
    forIn(components, (component) => {
        component.install && app.use(component)
    })
    return app
}

export { version }
export { install }

export * from './components'

export default { version, install }
