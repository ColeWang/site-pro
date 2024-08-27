import type { App } from 'vue'
import TimeRangePicker from './TimeRangePicker'
import { fieldTimeRangePickerProps, fieldTimeRangePickerSlots } from './typings'

TimeRangePicker.install = function (app: App): App {
    app.component(TimeRangePicker.name as string, TimeRangePicker)
    return app
}

export { TimeRangePicker as FieldTimeRangePicker, fieldTimeRangePickerProps, fieldTimeRangePickerSlots }

export type { FieldTimeRangePickerFieldProps, FieldTimeRangePickerProps, FieldTimeRangePickerInstance } from './typings'
