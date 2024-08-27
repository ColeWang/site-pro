import type { App } from 'vue'
import Cascader from './Cascader'
import { fieldCascaderProps, fieldCascaderSlots } from './typings'

Cascader.install = function (app: App): App {
    app.component(Cascader.name as string, Cascader)
    return app
}

export { Cascader as FieldCascader, fieldCascaderProps, fieldCascaderSlots }

export type { FieldCascaderFieldProps, FieldCascaderProps, FieldCascaderInstance } from './typings'
