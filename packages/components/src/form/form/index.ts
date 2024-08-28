import { Form as AForm } from 'ant-design-vue'
// ---
import Form from './Form'
import FormItem from './Item'
import FormGroup from './Group'
import FormDependency from './Dependency'

const useForm = AForm.useForm

Form.useForm = useForm
Form.Item = FormItem
Form.Group = FormGroup
Form.Dependency = FormDependency

export { useForm, Form, FormItem }
export { FormGroup, FormDependency }
