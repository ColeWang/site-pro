import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
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
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTreeSelectFieldProps>,
        default: () => ({})
    }
})

export type TreeSelectSlots = FieldSlots & FieldTreeSelectSlots;
export type TreeSelectProps = Partial<ExtractPropTypes<ReturnType<typeof treeSelectProps>>>;
export type TreeSelectInstance = ComponentPublicInstance<TreeSelectProps>;

const TreeSelect = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProTreeSelect',
    props: treeSelectProps(),
    slots: Object as SlotsType<TreeSelectSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TREE_SELECT_VALUE_TYPE,
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

export default TreeSelect as typeof TreeSelect & Plugin
