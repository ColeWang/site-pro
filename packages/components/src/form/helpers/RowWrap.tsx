import type { ComponentPublicInstance, ExtractPropTypes, PropType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { Row } from 'ant-design-vue'
import { pick } from 'lodash-es'
import type { RowProps } from '../../ant-typings'
import { rowProps } from '../../ant-typings'

const rowWarpProps = () => ({
    ...rowProps(),
    grid: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

export type RowWrapProps = Partial<ExtractPropTypes<ReturnType<typeof rowWarpProps>>>;
export type RowWrapInstance = ComponentPublicInstance<RowWrapProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProRowWrap',
    props: rowWarpProps(),
    setup (props, { slots }) {
        return () => {
            const { grid } = props
            const children: VNodeChild = slots.default && slots.default()

            if (grid) {
                const needRowProps: RowProps = pick(props, Object.keys(Row.props)) as RowProps
                return <Row {...needRowProps}>{children}</Row>
            }
            return children
        }
    }
})
