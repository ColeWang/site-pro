import type { PropType, TransitionProps } from 'vue'
import { defineComponent, nextTick, Transition } from 'vue'
import { addClass, removeClass, toPx } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import useStyle from './style'

function collapseMotion (name: string, appear: boolean): TransitionProps {
    return {
        name: name,
        appear: appear,
        css: true,
        onBeforeEnter (node: Element): void {
            addClass(node, name)
            ;(node as HTMLElement).style.height = '0px'
            ;(node as HTMLElement).style.opacity = '0'
        },
        onEnter (node: Element): void {
            nextTick().then(() => {
                ;(node as HTMLElement).style.height = toPx(node.scrollHeight)!
                ;(node as HTMLElement).style.opacity = '1'
            })
        },
        onAfterEnter (node: Element): void {
            if (node && (node as HTMLElement).style) {
                removeClass(node, name)
                ;(node as HTMLElement).style.height = ''
                ;(node as HTMLElement).style.opacity = ''
            }
        },
        onBeforeLeave (node: Element): void {
            addClass(node, name)
            ;(node as HTMLElement).style.height = toPx((node as HTMLElement).offsetHeight)!
            ;(node as HTMLElement).style.opacity = ''
        },
        onLeave (node: Element): void {
            nextTick().then(() => {
                ;(node as HTMLElement).style.height = toPx(0)!
                ;(node as HTMLElement).style.opacity = '0'
            })
        },
        onAfterLeave (node: Element): void {
            if (node && (node as HTMLElement).style) {
                removeClass(node, name)
                ;(node as HTMLElement).style.height = ''
                ;(node as HTMLElement).style.opacity = ''
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
