import type { FormInstance, FormProps, FormSlots } from './Form'
import Form, { formProps } from './Form'
import type { FormItemInstance, FormItemProps, FormItemSlots } from './Item'
import FormItem, { formItemProps } from './Item'
import type { FormGroupInstance, FormGroupProps, FormGroupSlots } from './Group'
import FormGroup, { formGroupProps } from './Group'
import type { FormDependencyInstance, FormDependencyProps, FormDependencySlots } from './Dependency'
import FormDependency, { formDependencyProps } from './Dependency'
import type { FieldInstance, FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type { UserFieldInstance, UserFieldProps, UserFieldSlots } from './UserField'
import UserField, { userFieldProps } from './UserField'

export { Form, formProps }
export { FormItem, formItemProps }
export { FormGroup, formGroupProps }
export { FormDependency, formDependencyProps }
export { Field, fieldProps }
export { UserField, userFieldProps }

export type { FormSlots, FormProps, FormInstance }
export type { FormItemSlots, FormItemProps, FormItemInstance }
export type { FormGroupSlots, FormGroupProps, FormGroupInstance }
export type { FormDependencySlots, FormDependencyProps, FormDependencyInstance }
export type { FieldSlots, FieldProps, FieldInstance }
export type { UserFieldSlots, UserFieldProps, UserFieldInstance }

export * from './components'
