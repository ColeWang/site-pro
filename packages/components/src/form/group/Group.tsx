import type { App, CSSProperties, Plugin, SlotsType, VNodeChild } from 'vue'
import { defineComponent, unref } from 'vue'
import { Col as AntCol, theme as antTheme } from 'ant-design-vue'
import { getPropsSlotVNode, toPx } from '@site-pro/utils'
import type { GlobalToken } from '../../theme'
import type { BaseFormLayout, RowWrapperProps } from '../../base-form'
import { ColWrapper, RowWrapper, useFormInstance } from '../../base-form'
import type { FormGroupSlots } from './typings'
import { formGroupProps } from './typings'

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

const FormGroup = defineComponent({
    inheritAttrs: false,
    name: 'ProFormGroup',
    props: formGroupProps(),
    slots: Object as SlotsType<FormGroupSlots>,
    setup (props, { slots, attrs }) {
        const { token } = antTheme.useToken()
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
                            <AntCol span={24}>
                                {noStyle ? titleDom : (
                                    <div style={titleStyle} {...attrs}>
                                        {titleDom}
                                    </div>
                                )}
                            </AntCol>
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

export default FormGroup as typeof FormGroup & Plugin
