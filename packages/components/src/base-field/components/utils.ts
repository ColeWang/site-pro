import { isEmpty } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import type { ConfigType } from 'dayjs'
import dayjs from 'dayjs'

export function formatDate (text: ConfigType, format?: Function | string) {
    // 可设置时区
    if (isEmpty(text)) return text
    if (isFunction(format)) return format(dayjs(text))
    return dayjs(text).format(format as string || 'YYYY-MM-DD')
}
