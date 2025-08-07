import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import type { BaseAttrs, BaseSlot, NamePath, Recordable } from '@site-pro/utils'
import { namePathToString, toPx } from '@site-pro/utils'
import { has, isArray, isString, merge, omit, pick } from 'lodash-es'
import type { BaseFormLayout, ColWrapperProps } from '../../base-form'
import { ColWrapper, useFormInstance } from '../../base-form'
import type { BaseFieldFormItemProps, BaseFieldProps, BaseFieldSlots } from '../../base-field'
import { BaseField, baseFieldProps } from '../../base-field'

export const fieldProps = () => ({
    ...baseFieldProps(),
    initialValue: {
        type: [String, Number, Boolean, Array, Object, Function] as PropType<any>,
        default: undefined
    },
    width: {
        type: [Number, String] as PropType<number | string>,
        default: undefined
    },
    labelWidth: {
        type: [String, Number] as PropType<'auto' | number>,
        default: undefined
    },
    hidden: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    colProps: {
        type: Object as PropType<ColWrapperProps>,
        default: () => ({})
    }
})

export interface FieldSlots extends BaseFieldSlots {
    default?: any;
    extra?: any;
    help?: any;
    label?: any;
    tooltip?: any;
}

export type FieldProps = Partial<ExtractPropTypes<ReturnType<typeof fieldProps>>>;
export type FieldInstance = ComponentPublicInstance<FieldProps>;

function genFormItemFixStyle (
    labelWidth: 'auto' | number | undefined,
    layout: BaseFormLayout
): BaseFieldFormItemProps & BaseAttrs {
    if (labelWidth && layout !== 'vertical' && labelWidth !== 'auto') {
        return {
            labelCol: { flex: `0 0 ${labelWidth}px` },
            wrapperCol: { style: { maxWidth: `calc(100% - ${labelWidth}px)` } },
            style: { flexWrap: 'nowrap' }
        }
    }
    return {}
}

const FORM_ITEM_SLOTS_KEYS: string[] = ['extra', 'help', 'label', 'tooltip']

const Field = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProField',
    props: fieldProps(),
    slots: Object as SlotsType<FieldSlots>,
    setup (props, { slots }) {
        const { model, formProps, setModelValue } = useFormInstance()

        // 初始化值 (同时防止 form 报错)
        props.formItemProps.name && setDefaultValue(props.formItemProps.name, props.initialValue)

        function setDefaultValue (namePath: NamePath, value: any): void {
            const hasValue: boolean = has(unref(model), namePath)
            !hasValue && onUpdateValue(namePath, value)
        }

        function onUpdateValue (namePath: NamePath, value: any): void {
            if (isString(namePath) || isArray(namePath)) {
                setModelValue && setModelValue(namePath, value)
            }
        }

        return () => {
            const { fieldProps, formItemProps, width: fieldWidth, labelWidth, hidden, colProps } = props
            const { layout, grid } = unref(formProps) || {}

            const key: string = namePathToString(formItemProps.name!)

            const needWidth: string | undefined = fieldWidth ? toPx(fieldWidth) : grid ? '100%' : undefined

            const needFieldProps: any & BaseAttrs = {
                ...fieldProps,
                style: { width: needWidth, ...fieldProps.style },
                'onUpdate:value': onUpdateValue.bind(null, formItemProps.name!)
            }

            const needFormItemProps: BaseFieldFormItemProps & BaseAttrs = merge({
                ...formItemProps,
                key: key,
                model: unref(model)
            }, genFormItemFixStyle(labelWidth, layout || 'vertical'))

            const needBaseFieldProps: BaseFieldProps = {
                ...pick(props, Object.keys(BaseField.props)) as BaseFieldProps,
                fieldProps: needFieldProps,
                formItemProps: needFormItemProps
            }

            const needColWrapProps: ColWrapperProps = {
                ...colProps,
                hidden: hidden,
                grid: grid,
            }

            const formItemSlots: Recordable<BaseSlot> = pick(slots, FORM_ITEM_SLOTS_KEYS)
            const baseFieldSlots: Recordable<BaseSlot> = omit(slots, FORM_ITEM_SLOTS_KEYS)

            return (
                <ColWrapper {...needColWrapProps} key={key}>
                    <AntForm.Item {...needFormItemProps} v-slots={formItemSlots}>
                        <BaseField {...needBaseFieldProps} v-slots={baseFieldSlots}/>
                    </AntForm.Item>
                </ColWrapper>
            )
        }
    }
})

Field.install = function (app: App): App {
    app.component(Field.name as string, Field)
    return app
}

export default Field as typeof Field & Plugin
