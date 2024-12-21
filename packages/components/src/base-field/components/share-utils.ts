import type { VNodeChild } from 'vue'
import { isEmpty } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export type Format = string | ((value: Dayjs) => string);

export function formatDate (text: any, format?: Format): VNodeChild {
    if (isEmpty(text)) return text
    // ----
    const date: Dayjs = dayjs(text)

    if (isFunction(format)) return format(date)

    return date.format(format as string || 'YYYY-MM-DD')
}
