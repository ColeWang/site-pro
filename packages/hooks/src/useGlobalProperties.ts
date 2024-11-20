import type { ComponentCustomProperties, ComponentInternalInstance } from 'vue'
import { getCurrentInstance } from 'vue'
import type { Recordable } from '@site-pro/utils'

function useGlobalProperties (): ComponentCustomProperties & Recordable {
    const instance: ComponentInternalInstance | null = getCurrentInstance()
    if (!instance || !instance.appContext) {
        throw new Error(`no instance found`)
    }
    return instance.appContext.config.globalProperties
}

export default useGlobalProperties
