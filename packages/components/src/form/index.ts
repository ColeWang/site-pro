import { Form as AForm } from 'ant-design-vue'
import type { FormInstance, FormProps } from './Form.tsx'
import Form, { formProps } from './Form.tsx'
import type { FormItemInstance, FormItemProps } from './Item.tsx'
import FormItem, { formItemProps } from './Item.tsx'
import type { FormGroupInstance, FormGroupProps } from './Group.tsx'
import FormGroup, { formGroupProps } from './Group.tsx'
import type { FormDependencyInstance, FormDependencyProps } from './Dependency.tsx'
import FormDependency, { formDependencyProps } from './Dependency.tsx'

const useForm = AForm.useForm

Form.useForm = useForm
Form.Item = FormItem
Form.Group = FormGroup
Form.Dependency = FormDependency

export { Form, formProps, useForm }
export { FormItem, formItemProps }
export { FormGroup, formGroupProps }
export { FormDependency, formDependencyProps }

export type { FormProps, FormInstance }
export type { FormItemProps, FormItemInstance }
export type { FormGroupProps, FormGroupInstance }
export type { FormDependencyProps, FormDependencyInstance }

export * from './components'
