import type { App, ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType, VNodeChild } from 'vue'
import { defineComponent, unref } from 'vue'
import { Button, Space, theme } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { toPx } from '@site-pro/utils'
import { pick } from 'lodash-es'
import { useLocaleReceiver } from '../locale'
import type { SubmitterProps } from '../base-form'
import { Submitter } from '../base-form'

export const queryFilterActionsProps = () => ({
    loading: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    collapsed: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    showCollapse: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    submitter: {
        type: Object as PropType<SubmitterProps>,
        default: () => ({})
    },
    onSubmit: {
        type: Function as PropType<(evt: Event) => void>,
        default: undefined
    },
    onReset: {
        type: Function as PropType<(evt: Event) => void>,
        default: undefined
    },
    onCollapse: {
        type: Function as PropType<(value: boolean) => void>,
        default: undefined
    }
})

export type QueryFilterActionsProps = Partial<ExtractPropTypes<ReturnType<typeof queryFilterActionsProps>>>;
export type QueryFilterActionsInstance = ComponentPublicInstance<QueryFilterActionsProps>;

const QueryFilterActions = defineComponent({
    inheritAttrs: false,
    name: 'ProQueryFilterActions',
    props: queryFilterActionsProps(),
    emits: ['submit', 'reset', 'collapse'],
    setup (props, { emit, attrs }) {
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Form'])

        function onCollapse (): void {
            emit('collapse', !props.collapsed)
        }

        return () => {
            const { collapsed, showCollapse, submitter } = props
            const { sizeMS, sizeXXS } = unref(token)

            const iconStyle: CSSProperties = { marginInlineStart: toPx(sizeXXS) }
            const collapseDom: false | VNodeChild = showCollapse && (
                <Button style={{ padding: 0 }} type={'link'} onClick={onCollapse}>
                    <span>{!collapsed ? t('expand') : t('collapsed')}</span>
                    {collapsed ? <DownOutlined style={iconStyle}/> : <UpOutlined style={iconStyle}/>}
                </Button>
            )
            const submitterProps: SubmitterProps = {
                ...pick(props, Object.keys(Submitter.props)) as SubmitterProps,
                ...pick(submitter, Object.keys(Submitter.props)) as SubmitterProps,
                submitText: submitter.submitText || t('search')
            }
            return (
                <div {...attrs}>
                    <Space size={sizeMS / 2}>
                        <Submitter {...submitterProps}/>
                        {collapseDom}
                    </Space>
                </div>
            )
        }
    }
})

QueryFilterActions.install = function (app: App): App {
    app.component(QueryFilterActions.name as string, QueryFilterActions)
    return app
}

export default QueryFilterActions
