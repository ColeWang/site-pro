import { defineComponent } from 'vue'
import { Content } from 'vitepress'
import { useConfigInject } from '@site-pro/hooks'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLayoutContainer',
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-container', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-space`}>
                        <div id={'viewContainer'} class={`${prefixCls.value}-view`}>
                            <div class={`${prefixCls.value}-view-fill`}/>
                            <div class={`${prefixCls.value}-view-content`}>
                                <Content/>
                            </div>
                            <div class={`${prefixCls.value}-view-fill`}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
