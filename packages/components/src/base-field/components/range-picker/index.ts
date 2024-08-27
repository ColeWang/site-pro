import type { App } from 'vue'
import RangePicker from './RangePicker'
import { fieldRangePickerProps, fieldRangePickerSlots } from './typings'

RangePicker.install = function (app: App): App {
    app.component(RangePicker.name as string, RangePicker)
    return app
}

export { RangePicker as FieldRangePicker, fieldRangePickerProps, fieldRangePickerSlots }

export type { FieldRangePickerFieldProps, FieldRangePickerProps, FieldRangePickerInstance } from './typings'
