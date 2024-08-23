import type { App } from 'vue'
import Switch from './Switch'
import type { FieldSwitchInstance, FieldSwitchProps } from './typings'
import { fieldSwitchProps } from './typings'

Switch.install = (app: App) => {
    app.component(Switch.name as string, Switch)
}

export { Switch as FieldSwitch, fieldSwitchProps }

export type { FieldSwitchProps, FieldSwitchInstance }
