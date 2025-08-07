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
    FieldCascaderFieldProps,
    FieldCascaderSlots
} from '../../base-field'

const CASCADER_VALUE_TYPE: BaseFieldValueType = 'cascader'

export const cascaderProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldCascaderFieldProps>,
        default: () => ({})
    }
})

export type CascaderSlots = FieldSlots & FieldCascaderSlots;
export type CascaderProps = Partial<ExtractPropTypes<ReturnType<typeof cascaderProps>>>;
export type CascaderInstance = ComponentPublicInstance<CascaderProps>;

const Cascader = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProCascader',
    props: cascaderProps(),
    slots: Object as SlotsType<CascaderSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: CASCADER_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Cascader.install = function (app: App): App {
    app.component(Cascader.name as string, Cascader)
    return app
}

export default Cascader as typeof Cascader & Plugin
