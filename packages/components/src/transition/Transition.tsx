import type { PropType, TransitionProps } from 'vue'
import { defineComponent, nextTick, Transition } from 'vue'
import { addClass, removeClass, setStyle, toPx } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
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

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTransition',
    props: {
        appear: {
            type: Boolean as PropType<boolean>,
            default: false,
        }
    },
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-transition', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        return () => {
            const { appear } = props

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Transition {...collapseMotion(`${prefixCls.value}-collapse`, appear)}>
                        {slots.default && slots.default()}
                    </Transition>
                </div>
            )
        }
    }
})
