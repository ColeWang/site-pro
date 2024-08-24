import type { App } from 'vue'
import TimePicker from './TimePicker'
import { fieldTimePickerProps } from './typings'

TimePicker.install = (app: App) => {
    app.component(TimePicker.name as string, TimePicker)
}

export { TimePicker as FieldTimePicker, fieldTimePickerProps }

export type { FieldTimePickerProps, FieldTimePickerInstance } from './typings'
