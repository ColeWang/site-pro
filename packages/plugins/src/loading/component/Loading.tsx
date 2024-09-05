import { defineComponent, Transition } from 'vue'
import { Spin } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { useConfigInject } from '@site-pro/hooks'
import { pluginLoadingProps } from './typings'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProPluginLoading',
    props: pluginLoadingProps(),
    emits: ['afterClose'],
    setup (props, { emit, attrs }) {
        const { prefixCls } = useConfigInject('pro-plugin-loading', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        // @todo body overflow: 'hidden' preventScroll

        function onAfterLeave (): void {
            emit('afterClose')
        }

        return () => {
            const { visible } = props

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Transition appear={true} name={`${prefixCls.value}-mask-fade`} onAfterLeave={onAfterLeave}>
                        <div v-show={visible} class={`${prefixCls.value}-mask`}>
                            <div class={`${prefixCls.value}-spin`}>
                                <Spin v-slots={{
                                    indicator: () => <LoadingOutlined/>
                                }}/>
                            </div>
                        </div>
                    </Transition>
                </div>
            )
        }
    }
})
