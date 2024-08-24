import type { App } from 'vue'
import TimeRangePicker from './TimeRangePicker'
import { fieldTimeRangePickerProps } from './typings'

TimeRangePicker.install = (app: App) => {
    app.component(TimeRangePicker.name as string, TimeRangePicker)
}

export { TimeRangePicker as FieldTimeRangePicker, fieldTimeRangePickerProps }

export type { FieldTimeRangePickerProps, FieldTimeRangePickerInstance } from './typings'
