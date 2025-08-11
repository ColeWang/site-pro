import type { ObjectPlugin, Reactive } from 'vue'
import { reactive } from 'vue'
import type { Recordable } from '@site-pro/utils'
import { isBrowserClient } from '@site-pro/utils'

export function createDocumentFragment (id?: string): HTMLElement | null {
    if (isBrowserClient && document.body) {
        const container: HTMLElement = document.createElement('div')
        id && (container.id = id)
        document.body.appendChild(container)
        return container
    }
    return null
}

export function createReactivePlugin<T extends Recordable, P extends ObjectPlugin> (state: T, plugin: P): T & P {
    const pluginState: Reactive<T> = reactive(state)

    for (const name in pluginState) {
        if (Object.hasOwnProperty.bind(pluginState, name)) {
            Object.defineProperty(plugin, name, {
                enumerable: true,
                get (): T[keyof T] {
                    return pluginState[name]
                },
                set (value: T[keyof T]): void {
                    pluginState[name] = value
                }
            })
        }
    }

    return plugin as T & P
}
