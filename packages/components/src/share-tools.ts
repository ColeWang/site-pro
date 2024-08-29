import type { CSSProperties } from 'vue'
import type { FormItemProps } from '@site-pro/utils'
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

export function genFormItemFixStyle (labelWidth: string | number, layout: string): FormItemProps {
    if (labelWidth && layout !== 'vertical' && labelWidth !== 'auto') {
        const wrapperColStyle: CSSProperties = { maxWidth: `calc(100% - ${labelWidth}px)` }
        return {
            style: { flexWrap: 'nowrap' },
            labelCol: { flex: `0 0 ${labelWidth}px` },
            wrapperCol: { style: wrapperColStyle }
        }
    }
    return {}
}


