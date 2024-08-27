import type { App } from 'vue'
import Switch from './Switch'
import { fieldSwitchProps, fieldSwitchSlots } from './typings'

Switch.install = function (app: App): App {
    app.component(Switch.name as string, Switch)
    return app
}

export { Switch as FieldSwitch, fieldSwitchProps, fieldSwitchSlots }

export type { FieldSwitchFieldProps, FieldSwitchProps, FieldSwitchInstance } from './typings'
