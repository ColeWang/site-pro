import type { App } from 'vue'
import RangePicker from './RangePicker'
import { fieldRangePickerProps } from './typings'

RangePicker.install = (app: App) => {
    app.component(RangePicker.name as string, RangePicker)
}

export { RangePicker as FieldRangePicker, fieldRangePickerProps }

export type { FieldRangePickerProps, FieldRangePickerInstance } from './typings'
