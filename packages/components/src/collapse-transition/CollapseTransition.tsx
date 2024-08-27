import type { App, SlotsType, TransitionProps } from 'vue'
import { defineComponent, nextTick, Transition } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import { addClass, removeClass, setStyle, toPx } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { collapseTransitionProps } from './typings'
import useStyle from './style'

function collapseMotion (name: string, appear: boolean): TransitionProps {
    return {
        name: name,
        appear: appear,
        css: true,
        onBeforeEnter (node: Element): void {
            addClass(node, name)
            setStyle(node, { height: toPx(0), opacity: '0' })
        },
        onEnter (node: Element): void {
            nextTick().then(() => {
                setStyle(node, { height: toPx(node.scrollHeight), opacity: '1' })
            })
        },
        onAfterEnter (node: Element): void {
            if (node && (node as HTMLElement).style) {
                removeClass(node, name)
                setStyle(node, { height: '', opacity: '' })
            }
        },
        onBeforeLeave (node: Element): void {
            addClass(node, name)
            setStyle(node, { height: toPx((node as HTMLElement).offsetHeight), opacity: '' })
        },
        onLeave (node: Element): void {
            nextTick().then(() => {
                setStyle(node, { height: toPx(0), opacity: '0' })
            })
        },
        onAfterLeave (node: Element): void {
            if (node && (node as HTMLElement).style) {
                removeClass(node, name)
                setStyle(node, { height: '', opacity: '' })
            }
        }
    }
}

const CollapseTransition = defineComponent({
    inheritAttrs: false,
    name: 'ProCollapseTransition',
    props: collapseTransitionProps(),
    slots: Object as SlotsType<{
        default?: BaseSlot;
    }>,
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-collapse-transition', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        return () => {
            const { appear } = props

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Transition {...collapseMotion(`${prefixCls.value}-wrapper`, appear)}>
                        {slots.default && slots.default()}
                    </Transition>
                </div>
            )
        }
    }
})

CollapseTransition.install = function (app: App): App {
    app.component(CollapseTransition.name as string, CollapseTransition)
    return app
}

export default CollapseTransition
