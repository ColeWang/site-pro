import type {
    App,
    ComponentPublicInstance,
    CSSProperties,
    ExtractPropTypes,
    PropType,
    SlotsType,
    VNodeChild
} from 'vue'
import { defineComponent, unref } from 'vue'
import { Col, theme } from 'ant-design-vue'
import type { BaseSlot } from '@site-pro/utils'
import { getPropsSlotVNode, toPx } from '@site-pro/utils'
import type { BaseFormLayout, RowWrapperProps } from '../base-form'
import { ColWrapper, RowWrapper, useFormInstance } from '../base-form'
import type { GlobalToken } from '../theme'

function genTitleStyle (layout: BaseFormLayout, token: GlobalToken): CSSProperties {
    const baseStyle: CSSProperties = {
        fontSize: token.fontSize,
        color: token.colorText,
        lineHeight: token.lineHeight,
        fontWeight: token.fontWeightStrong,
    }
    if (layout === 'inline') {
        const needPadding: number = token.size / 2
        return { ...baseStyle, paddingBlock: toPx(needPadding) }
    }
    return { ...baseStyle, paddingBlockEnd: toPx(token.size) }
}

export const formGroupProps = () => ({
    title: {
        type: [String, Function] as PropType<string | BaseSlot>,
        default: undefined
    },
    noStyle: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

export interface FormGroupSlots {
    default?: any;
    title?: any;
}

export type FormGroupProps = Partial<ExtractPropTypes<ReturnType<typeof formGroupProps>>>;
export type FormGroupInstance = ComponentPublicInstance<FormGroupProps>;

const FormGroup = defineComponent({
    inheritAttrs: false,
    name: 'ProFormGroup',
    props: formGroupProps(),
    slots: Object as SlotsType<FormGroupSlots>,
    setup (props, { slots, attrs }) {
        const { token } = theme.useToken()
        const { formProps } = useFormInstance()

        return () => {
            const { noStyle } = props
            const { layout, grid, rowProps } = unref(formProps) || {}

            const titleDom: VNodeChild = getPropsSlotVNode(slots, props, 'title')
            const titleStyle: CSSProperties = genTitleStyle(layout || 'vertical', unref(token))

            const rowWrapperProps: RowWrapperProps = { ...rowProps, grid: grid }

            return (
                <ColWrapper span={24} grid={grid}>
                    <RowWrapper {...rowWrapperProps}>
                        {titleDom && (
                            <Col span={24}>
                                {noStyle ? titleDom : (
                                    <div style={titleStyle} {...attrs}>
                                        {titleDom}
                                    </div>
                                )}
                            </Col>
                        )}
                        {slots.default && slots.default()}
                    </RowWrapper>
                </ColWrapper>
            )
        }
    }
})

FormGroup.install = function (app: App): App {
    app.component(FormGroup.name as string, FormGroup)
    return app
}

export default FormGroup
