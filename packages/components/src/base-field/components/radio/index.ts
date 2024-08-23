import type { App } from 'vue'
import Radio from './Radio'
import type { FieldRadioInstance, FieldRadioProps } from './typings'
import { fieldRadioProps } from './typings'

Radio.install = (app: App) => {
    app.component(Radio.name as string, Radio)
}

export { Radio as FieldRadio, fieldRadioProps }

export type { FieldRadioProps, FieldRadioInstance }
