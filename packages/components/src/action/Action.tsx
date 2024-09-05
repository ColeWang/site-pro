import type { App, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { BaseClass } from '@site-pro/utils'
import { preventDefault } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { actionProps } from './typings'
import useStyle from './style'

const Action = defineComponent({
    inheritAttrs: false,
    name: 'ProAction',
    props: actionProps(),
    slots: Object as SlotsType<{
        default?: any;
    }>,
    emits: ['click'],
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-action', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        function onClick (evt: Event): void {
            preventDefault(evt)
            emit('click', evt)
        }

        return () => {
            const actionClass: BaseClass = [prefixCls.value, hashId.value, {
                [`${prefixCls.value}-default`]: props.type === 'default',
                [`${prefixCls.value}-primary`]: props.type === 'primary',
                [`${prefixCls.value}-warning`]: props.type === 'warning',
                [`${prefixCls.value}-error`]: props.type === 'error'
            }]

            return wrapSSR(
                <a class={actionClass} onClick={onClick} {...attrs}>
                    {slots.default && slots.default()}
                </a>
            )
        }
    }
})

Action.install = function (app: App): App {
    app.component(Action.name as string, Action)
    return app
}

export default Action
