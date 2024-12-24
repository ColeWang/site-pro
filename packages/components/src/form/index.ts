import type { FormInstance, FormProps, FormSlots } from './form'
import { Form, formProps } from './form'
import type { FormItemInstance, FormItemProps, FormItemSlots } from './item'
import { FormItem, formItemProps } from './item'
import type { FormGroupInstance, FormGroupProps, FormGroupSlots } from './group'
import { FormGroup, formGroupProps } from './group'
import type { FormDependencyInstance, FormDependencyProps, FormDependencySlots } from './dependency'
import { FormDependency, formDependencyProps } from './dependency'

export { Form, formProps }
export { FormItem, formItemProps }
export { FormGroup, formGroupProps }
export { FormDependency, formDependencyProps }

export type { FormSlots, FormProps, FormInstance }
export type { FormItemSlots, FormItemProps, FormItemInstance }
export type { FormGroupSlots, FormGroupProps, FormGroupInstance }
export type { FormDependencySlots, FormDependencyProps, FormDependencyInstance }

export * from './components'
