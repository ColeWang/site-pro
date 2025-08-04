import type { VNodeChild } from 'vue'
import { isEmpty } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export function dateFormat (text: any, format?: any): VNodeChild {
    if (isEmpty(text)) return text
    // ----
    const date: Dayjs = dayjs(text)

    if (isFunction(format)) return format(date)

    return date.format(format as string || 'YYYY-MM-DD')
}
