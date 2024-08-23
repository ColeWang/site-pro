import { isEmpty } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import type { ConfigType, Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export type CustomFormat = string | ((value: Dayjs) => string);

export function formatDate (text: ConfigType, format?: CustomFormat) {
    // 可设置时区
    if (isEmpty(text)) return text
    if (isFunction(format)) return format(dayjs(text))
    return dayjs(text).format(format as string || 'YYYY-MM-DD')
}
