import type { App, ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import type { BaseAttrs, BaseSlot, FormItemProps, NamePath, Recordable } from '@site-pro/utils'
import { namePathToString, toPx } from '@site-pro/utils'
import { get, has, isArray, isString, merge, omit, pick } from 'lodash-es'
import type { BaseFormLayout, ColWrapperProps } from '../../base-form'
import { ColWrapper, useFormInstance } from '../../base-form'
import type { BaseFieldFormItemProps, BaseFieldProps } from '../../base-field'
import { BaseField, baseFieldProps } from '../../base-field'
// 88
// 88 * 2 + 8 = 184
// 88 * 3 + 16 = 280
// 88 * 4 + 24 = 376
// 88 * 5 + 32 = 472

// 104
// 104 * 2 + 16 = 224
// 104 * 3 + 32 = 344
// 104 * 4 + 48 = 464
// 104 * 5 + 64 = 584


// @todo 紧凑模式 还需要考虑到 非 grid 模式下 怎么使用
// @todo 考虑去除这部分逻辑
// 正常模式下
const SIZE_ENUM: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
    xs: 104,
    sm: 216,
    md: 328,
    lg: 440,
    xl: 552
}

export type FieldSizeType = keyof typeof SIZE_ENUM | number;

export interface FieldSlots {
    default?: any;
    extra?: any;
    help?: any;
    label?: any;
    tooltip?: any;
}

export const fieldProps = () => ({
    ...baseFieldProps(),
    width: {
        type: [String, Number] as PropType<FieldSizeType>,
        default: undefined
    },
    labelWidth: {
        type: [String, Number] as PropType<'auto' | number>,
        default: 'auto'
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

export type FieldProps = Partial<ExtractPropTypes<ReturnType<typeof fieldProps>>>;
export type FieldInstance = ComponentPublicInstance<FieldProps>;

function genFieldStyle (
    style: CSSProperties | undefined,
    fieldWidth: FieldSizeType,
): CSSProperties {
    const { maxWidth, minWidth, width, ...restStyle } = style || {}
    const fieldSize: number | undefined = isString(fieldWidth)
        ? get(SIZE_ENUM, fieldWidth)
        : fieldWidth

    return {
        ...restStyle,
        maxWidth: maxWidth || '100%',
        minWidth: minWidth || toPx(SIZE_ENUM['xs']),
        width: width || toPx(fieldSize) || '100%'
    }
}

function genFormItemLabelWidth (
    labelWidth: 'auto' | number | undefined,
    layout: BaseFormLayout
): FormItemProps & BaseAttrs {
    if (labelWidth && layout !== 'vertical' && labelWidth !== 'auto') {
        return {
            labelCol: { flex: `0 0 ${labelWidth}px` },
            wrapperCol: { style: { maxWidth: `calc(100% - ${labelWidth}px)` } },
            style: { flexWrap: 'nowrap' }
        }
    }
    return {}
}

const Field = defineComponent({
    inheritAttrs: false,
    name: 'ProField',
    props: fieldProps(),
    slots: Object as SlotsType<FieldSlots>,
    setup (props, { slots }) {
        const SLOTS_KEYS: string[] = ['extra', 'help', 'label', 'tooltip']

        const { model, formProps, setModelValue } = useFormInstance()

        // 初始化值 防止 form 报错
        const { name: fieldNamePath } = props.formItemProps
        fieldNamePath && setDefaultValue(fieldNamePath)

        function setDefaultValue (namePath: NamePath): void {
            const hasValue = has(unref(model), namePath)
            !hasValue && onUpdateValue(namePath, undefined)
        }

        function onUpdateValue (namePath: NamePath, value: any): void {
            if (isString(namePath) || isArray(namePath)) {
                setModelValue && setModelValue(namePath, value)
            }
        }

        return () => {
            const { fieldProps, formItemProps, width: fieldWidth, labelWidth, hidden, colProps } = props
            const { layout, grid } = unref(formProps) || {}

            const extraFormItemProps: BaseFieldFormItemProps = genFormItemLabelWidth(labelWidth, layout || 'vertical')
            const key: string = namePathToString(formItemProps.name!)

            const needFieldProps: any = {
                ...fieldProps,
                style: genFieldStyle(fieldProps.style, fieldWidth!),
                ['onUpdate:value']: onUpdateValue.bind(null, formItemProps.name!)
            }

            const needFormItemProps: BaseFieldFormItemProps = merge({
                ...formItemProps,
                key: key,
                model: unref(model)
            }, extraFormItemProps)

            const needBaseFieldProps: BaseFieldProps = {
                ...(pick(props, Object.keys(BaseField.props)) as BaseFieldProps),
                fieldProps: needFieldProps,
                formItemProps: needFormItemProps
            }

            const needColWrapProps: ColWrapperProps = {
                ...colProps,
                hidden: hidden,
                grid: grid,
            }

            const formItemSlots: Recordable<BaseSlot> = pick(slots, SLOTS_KEYS)
            const baseFieldSlots: Recordable<BaseSlot> = omit(slots, SLOTS_KEYS)

            return (
                <ColWrapper {...needColWrapProps} key={key}>
                    <Form.Item {...needFormItemProps} v-slots={formItemSlots}>
                        <BaseField {...needBaseFieldProps} v-slots={baseFieldSlots}/>
                    </Form.Item>
                </ColWrapper>
            )
        }
    }
})

Field.install = function (app: App): App {
    app.component(Field.name as string, Field)
    return app
}

export default Field
