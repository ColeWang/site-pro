import { defineComponent } from 'vue'
import { useConfigInject } from '@site-pro/hooks'
import { progressProps } from './typings'
import useStyle from './style'

export default defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProProgressPlugin',
    props: progressProps(),
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-progress-plugin', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        return () => {
            const { style } = props

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-bar`} style={style}/>
                </div>
            )
        }
    }
})
