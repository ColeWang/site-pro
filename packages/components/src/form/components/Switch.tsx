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
    FieldSwitchFieldProps,
    FieldSwitchSlots
} from '../../base-field'

const SWITCH_VALUE_TYPE: BaseFieldValueType = 'switch'

export const switchProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldSwitchFieldProps>,
        default: () => ({})
    }
})

export type SwitchProps = Partial<ExtractPropTypes<ReturnType<typeof switchProps>>>;
export type SwitchInstance = ComponentPublicInstance<SwitchProps>;

const Switch = defineComponent({
    inheritAttrs: false,
    name: 'ProSwitch',
    props: switchProps(),
    slots: Object as FieldSlots & FieldSwitchSlots,
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: SWITCH_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Switch.install = function (app: App): App {
    app.component(Switch.name as string, Switch)
    return app
}

export default Switch
