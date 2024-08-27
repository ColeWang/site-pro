import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldTreeSelectFieldProps,
    FieldTreeSelectSlots
} from '../../base-field'

const TREE_SELECT_VALUE_TYPE: BaseFieldValueType = 'treeSelect'

export const treeSelectProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTreeSelectFieldProps>,
        default: () => ({})
    }
})

export type TreeSelectProps = Partial<ExtractPropTypes<ReturnType<typeof treeSelectProps>>>;
export type TreeSelectInstance = ComponentPublicInstance<TreeSelectProps>;

const TreeSelect = defineComponent({
    inheritAttrs: false,
    name: 'ProTreeSelect',
    props: treeSelectProps(),
    slots: Object as FieldSlots & FieldTreeSelectSlots,
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TREE_SELECT_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

TreeSelect.install = function (app: App): App {
    app.component(TreeSelect.name as string, TreeSelect)
    return app
}

export default TreeSelect
