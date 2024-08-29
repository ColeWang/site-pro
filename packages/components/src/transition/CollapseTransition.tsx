import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType, TransitionProps } from 'vue'
import { defineComponent, nextTick, Transition } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import { addClass, removeClass, setStyle, toPx } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import useStyle from './style/collapse'

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

export const collapseTransitionProps = () => ({
    appear: {
        type: Boolean as PropType<boolean>,
        default: false,
    }
})

export type CollapseTransitionProps = Partial<ExtractPropTypes<ReturnType<typeof collapseTransitionProps>>>;
export type CollapseTransitionInstance = ComponentPublicInstance<CollapseTransitionProps>;

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

            const transitionProps = collapseMotion(`${prefixCls.value}-wrapper`, appear)

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Transition {...transitionProps}>
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
