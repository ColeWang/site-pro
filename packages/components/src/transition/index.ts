import type { App } from 'vue'
import Transition from './Transition'

Transition.install = function (app: App): App {
    app.component(Transition.name as string, Transition)
    return app
}

export { Transition }
