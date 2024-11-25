import type { App, Plugin } from 'vue'
import type { Recordable } from '@site-pro/utils'
import { forIn } from 'lodash-es'
import * as components from './components'
import version from './version'

function install (app: App): App {
    forIn(components as unknown as Recordable<Plugin>, (component) => {
        component.install && app.use(component)
    })
    return app
}

export { version }
export { install }

export * from './components'

export default { version, install }
