import type { ComponentPublicInstance, ExtractPropTypes, PropType, VNodeChild } from 'vue'
import { defineComponent, unref } from 'vue'
import { Space, theme } from 'ant-design-vue'
import {
    VerticalAlignBottomOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignTopOutlined
} from '@ant-design/icons-vue'
import { useConfigInject } from '@site-pro/hooks'
import { useLocaleReceiver } from '../../../../locale-provider'
import type { TooltipProps } from './Tooltip'
import Tooltip from './Tooltip'
import useStyle from '../style/node'

export const nodeProps = () => ({
    columnKey: {
        type: String as PropType<string>,
        default: undefined
    },
    title: {
        type: String as PropType<string>,
        default: undefined
    },
    fixed: {
        type: String as PropType<string>,
        default: undefined
    },
    disabledSettingIcon: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    onChange: {
        type: Function as PropType<(key: string, fixed: boolean) => void>,
        default: undefined
    }
})

export type NodeProps = Partial<ExtractPropTypes<ReturnType<typeof nodeProps>>>;
export type NodeInstance = ComponentPublicInstance<NodeProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableSettingNode',
    props: nodeProps(),
    emits: ['change'],
    setup (props, { emit }) {
        const { prefixCls } = useConfigInject('pro-table-setting-node', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'toolbar'])

        /* v8 ignore next 3 */
        function onChange (fixed: boolean): void {
            emit('change', props.columnKey, fixed)
        }

        return () => {
            const { title, fixed, columnKey, disabledSettingIcon } = props
            const { sizeXXS } = unref(token)

            const tooltipProps: TooltipProps = {
                columnKey: columnKey,
                onChange: onChange
            }

            const iconDom: VNodeChild = (
                <Space size={sizeXXS}>
                    {fixed !== 'left' && (
                        <Tooltip title={t('leftPin')} fixed={'left'} {...tooltipProps}>
                            <VerticalAlignTopOutlined/>
                        </Tooltip>
                    )}
                    {!!fixed && (
                        <Tooltip title={t('noPin')} {...tooltipProps}>
                            <VerticalAlignMiddleOutlined/>
                        </Tooltip>
                    )}
                    {fixed !== 'right' && (
                        <Tooltip title={t('rightPin')} fixed={'right'} {...tooltipProps}>
                            <VerticalAlignBottomOutlined/>
                        </Tooltip>
                    )}
                </Space>
            )

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]}>
                    <div class={`${prefixCls.value}-title`}>{title}</div>
                    <div class={`${prefixCls.value}-option`}>
                        <div class={`${prefixCls.value}-option-icon`}>
                            {!disabledSettingIcon && iconDom}
                        </div>
                    </div>
                </div>
            )
        }
    }
})

