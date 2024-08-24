import type { App } from 'vue'
import DatePicker from './DatePicker'
import { fieldDatePickerProps } from './typings'

DatePicker.install = (app: App) => {
    app.component(DatePicker.name as string, DatePicker)
}

export { DatePicker as FieldDatePicker, fieldDatePickerProps }

export type { FieldDatePickerProps, FieldDatePickerInstance } from './typings'
