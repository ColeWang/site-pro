import type { ObjectPlugin, Reactive } from 'vue'
import { reactive } from 'vue'


export function createDocumentFragment (id?: string): HTMLElement {
    const container: HTMLElement = document.createElement('div')
    id && (container.id = id)
    document.body.appendChild(container)
    return container
}

export function createReactivePlugin<S extends Record<string, any>, P extends Record<any, any> & ObjectPlugin> (state: S, plugin: P): P {
    const pluginState: Reactive<S> = reactive(state)

    for (const name in pluginState) {
        Object.defineProperty(plugin, name, {
            enumerable: true,
            get () {
                return pluginState[name]
            },
            set (value) {
                pluginState[name] = value
            }
        })
    }

    return plugin as P
}
