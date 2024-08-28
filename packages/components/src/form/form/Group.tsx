import type { App, ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Col, theme } from 'ant-design-vue'
import type { BaseSlot } from '@site-pro/utils'
import { getPropsSlot, toPx } from '@site-pro/utils'
import { useFormInstance } from '../base-form'
import type { GlobalToken } from '../../theme'
import type { RowWrapperProps } from '../helpers/RowWrapper'
import RowWrapper from '../helpers/RowWrapper'
import ColWrapper from '../helpers/ColWrapper'

function genTitleStyle (layout: string, token: GlobalToken): CSSProperties {
    const baseStyle: CSSProperties = {
        fontSize: token.fontSize,
        color: token.colorText,
        lineHeight: token.lineHeight,
        fontWeight: token.fontWeightStrong,
    }
    if (layout === 'inline') {
        const needPadding = token.size / 2
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

export type FormGroupProps = Partial<ExtractPropTypes<ReturnType<typeof formGroupProps>>>;
export type FormGroupInstance = ComponentPublicInstance<FormGroupProps>;

const FormGroup = defineComponent({
    inheritAttrs: false,
    name: 'ProFormGroup',
    props: formGroupProps(),
    slots: Object as SlotsType<{
        default?: BaseSlot;
        title?: BaseSlot;
    }>,
    setup (props, { slots, attrs }) {
        const { token } = theme.useToken()
        const { formProps } = useFormInstance()

        return () => {
            const { noStyle } = props
            const { layout, grid, rowProps } = unref(formProps) || {}

            const titleDom = getPropsSlot(slots, props, 'title')
            const titleStyle = genTitleStyle(layout || 'vertical', unref(token))

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
