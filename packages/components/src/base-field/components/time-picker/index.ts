import type { App } from 'vue'
import TimePicker from './TimePicker'
import { fieldTimePickerProps, fieldTimePickerSlots } from './typings'

TimePicker.install = function (app: App): App {
    app.component(TimePicker.name as string, TimePicker)
    return app
}

export { TimePicker as FieldTimePicker, fieldTimePickerProps, fieldTimePickerSlots }

export type { FieldTimePickerFieldProps, FieldTimePickerProps, FieldTimePickerInstance } from './typings'
