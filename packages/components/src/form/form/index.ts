import { Form as AForm } from 'ant-design-vue'
import type { FormInstance, FormProps } from './Form'
import Form, { formProps } from './Form'
import type { FormItemInstance, FormItemProps } from './Item'
import FormItem, { formItemProps } from './Item'
import type { FormGroupInstance, FormGroupProps } from './Group'
import FormGroup, { formGroupProps } from './Group'
import type { FormDependencyInstance, FormDependencyProps } from './Dependency'
import FormDependency, { formDependencyProps } from './Dependency'

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
