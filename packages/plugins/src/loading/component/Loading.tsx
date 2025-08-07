import { defineComponent, Transition } from 'vue'
import { Spin as AntSpin } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { useConfigInject } from '@site-pro/hooks'
import { loadingProps } from './typings'
import useStyle from './style'

export default defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProLoadingPlugin',
    props: loadingProps(),
    emits: ['afterClose'],
    setup (props, { emit, attrs }) {
        const { prefixCls } = useConfigInject('pro-loading-plugin', props)
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
                                <AntSpin v-slots={{
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
