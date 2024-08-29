import type { FormItemProps, Recordable } from '@site-pro/utils'
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

export function genFormItemFixStyle (labelWidth: string | number, layout: string): FormItemProps & Recordable {
    if (labelWidth && layout !== 'vertical' && labelWidth !== 'auto') {
        return {
            labelCol: { flex: `0 0 ${labelWidth}px` },
            wrapperCol: { style: { maxWidth: `calc(100% - ${labelWidth}px)` } },
            style: { flexWrap: 'nowrap' }
        }
    }
    return {}
}


