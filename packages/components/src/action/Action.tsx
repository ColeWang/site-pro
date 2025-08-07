import type { App, Plugin, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { BaseClass } from '@site-pro/utils'
import { preventDefault } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import ActionGroup from './Group'
import type { ActionSlots } from './typings'
import { actionProps } from './typings'
import useStyle from './style'

const Action = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProAction',
    props: actionProps(),
    slots: Object as SlotsType<ActionSlots>,
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

Action.Group = ActionGroup

export default Action as typeof Action & Plugin & {
    readonly Group: typeof ActionGroup;
}
