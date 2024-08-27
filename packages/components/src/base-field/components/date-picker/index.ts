import type { App } from 'vue'
import DatePicker from './DatePicker'
import { fieldDatePickerProps, fieldDatePickerSlots } from './typings'

DatePicker.install = function (app: App): App {
    app.component(DatePicker.name as string, DatePicker)
    return app
}

export { DatePicker as FieldDatePicker, fieldDatePickerProps, fieldDatePickerSlots }

export type { FieldDatePickerFieldProps, FieldDatePickerProps, FieldDatePickerInstance } from './typings'
