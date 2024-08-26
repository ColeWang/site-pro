import type { App, Plugin } from 'vue'
import { isEmpty } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import type { ConfigType, Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export type CustomFormat = string | ((value: Dayjs) => string);

export function formatDate (text: ConfigType, format?: CustomFormat): string | number | null | undefined {
    // 可设置时区
    if (isEmpty(text)) return text
    if (isFunction(format)) return format(dayjs(text))
    return dayjs(text).format(format as string || 'YYYY-MM-DD')
}

export function withInstall<T> (component: T): T & Plugin {
    const comp = component as any
    comp.install = (app: App) => {
        app.component(comp.displayName || comp.name, comp)
        return app
    }
    return comp as T & Plugin
}
