import type { ComponentCustomProperties } from 'vue'
import { getCurrentInstance } from 'vue'

function useGlobalProperties (): ComponentCustomProperties & Record<string, any> {
    const instance = getCurrentInstance()
    if (!instance || !instance.appContext) {
        throw new Error(`no instance found`)
    }
    return instance.appContext.config.globalProperties
}

export default useGlobalProperties
