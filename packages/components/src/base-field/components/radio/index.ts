import type { App } from 'vue'
import Radio from './Radio'
import { fieldRadioProps, fieldRadioSlots } from './typings'

Radio.install = function (app: App): App {
    app.component(Radio.name as string, Radio)
    return app
}

export { Radio as FieldRadio, fieldRadioProps, fieldRadioSlots }

export type { FieldRadioFieldProps, FieldRadioProps, FieldRadioInstance } from './typings'
