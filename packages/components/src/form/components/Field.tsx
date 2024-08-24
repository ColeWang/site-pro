import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import type { BaseNamePath } from '@site-pro/utils'
import { namePathToString, toPx } from '@site-pro/utils'
import { has, isArray, isNumber, isString, merge, pick } from 'lodash-es'
import type { ColWrapProps } from '../helpers/ColWrap'
import ColWrap from '../helpers/ColWrap'
import type { BaseFieldProps } from '../../base-field'
import { BaseField, baseFieldProps as proBaseFieldProps } from '../../base-field'
import { useFormInstance } from '../base-form'
import { genFormItemFixStyle } from '../utils'

type BaseFieldFormItemProps = BaseFieldProps['formItemProps'];

const sizeEnum: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
    xs: 104,
    sm: 216,
    md: 328,
    lg: 440,
    xl: 552
}

export type FieldSizeType = Extract<keyof typeof sizeEnum, any> | number;

const baseFieldProps = proBaseFieldProps()

export const fieldProps = () => ({
    ...baseFieldProps,
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
        type: Object as PropType<ColWrapProps>,
        default: () => ({})
    }
})

export type FieldProps = Partial<ExtractPropTypes<ReturnType<typeof fieldProps>>>;
export type FieldInstance = ComponentPublicInstance<FieldProps>;

function fieldStyle (style: CSSProperties | undefined, fieldWidth: FieldSizeType): CSSProperties {
    const { maxWidth, minWidth, width, ...restStyle } = style || {}
    const fieldSize: string | undefined = isNumber(fieldWidth) ? toPx(fieldWidth) : toPx(sizeEnum[fieldWidth])
    return {
        ...restStyle,
        maxWidth: maxWidth || '100%',
        minWidth: minWidth || toPx(sizeEnum['xs']),
        width: width || fieldSize || '100%'
    }
}

export default defineComponent({
    inheritAttrs: false,
    name: 'ProField',
    props: fieldProps(),
    setup (props, { slots: fieldSlots }) {
        const { model, formProps, setModelValue } = useFormInstance()

        // 初始化值 防止 form 报错
        const { name: fieldNamePath } = props.formItemProps
        fieldNamePath && setDefaultValue(fieldNamePath)

        function setDefaultValue (namePath: BaseNamePath): void {
            const hasValue = has(unref(model), namePath)
            !hasValue && onUpdateValue(namePath, undefined)
        }

        function onUpdateValue (namePath: BaseNamePath, value: any): void {
            if (isString(namePath) || isArray(namePath)) {
                setModelValue && setModelValue(namePath, value)
            }
        }

        return () => {
            const { fieldProps, formItemProps, width: fieldWidth, labelWidth, hidden, colProps } = props
            const { layout, grid } = unref(formProps) || {}

            const extraFormItemProps: any = genFormItemFixStyle(labelWidth, layout || 'vertical')
            const key: string = namePathToString(formItemProps.name!)

            const needFieldProps: any = {
                ...fieldProps,
                style: fieldStyle(fieldProps.style, fieldWidth!),
                ['onUpdate:value']: onUpdateValue.bind(null, formItemProps.name!)
            }

            const needFormItemProps: BaseFieldFormItemProps = merge({
                ...formItemProps,
                key: key,
                model: unref(model)
            }, extraFormItemProps)

            const needBaseFieldProps: BaseFieldProps = {
                ...pick(props, Object.keys(baseFieldProps)),
                fieldProps: needFieldProps,
                formItemProps: needFormItemProps
            }

            const needColWrapProps: ColWrapProps = {
                ...colProps,
                hidden: hidden,
                grid: grid,
            }

            return (
                <ColWrap {...needColWrapProps} key={key}>
                    <Form.Item {...needFormItemProps}>
                        <BaseField {...needBaseFieldProps} v-slots={fieldSlots}/>
                    </Form.Item>
                </ColWrap>
            )
        }
    }
})
