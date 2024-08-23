import type { App } from 'vue'
import Cascader from './Cascader'
import type { FieldCascaderInstance, FieldCascaderProps } from './typings'
import { fieldCascaderProps } from './typings'

Cascader.install = (app: App) => {
    app.component(Cascader.name as string, Cascader)
}

export { Cascader as FieldCascader, fieldCascaderProps }

export type { FieldCascaderProps, FieldCascaderInstance }
