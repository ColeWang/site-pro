import { defineComponent, ref, unref } from 'vue'
import { Input, Space, theme } from 'ant-design-vue'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { getSlotVNode, preventDefault, isEmpty } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import type { PasswordProps } from '../../typings'
import { fieldPasswordProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    props: fieldPasswordProps,
    setup (props, { slots }) {
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['global'])

        const { fieldProps } = props
        const visible = ref(fieldProps.visible || false)

        function onVisibleClick (evt: Event) {
            preventDefault(evt)
            visible.value = !unref(visible)
        }

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { sizeXXS } = unref(token)
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                if (isEmpty(text)) {
                    return emptyText
                }
                const eyeIcon = unref(visible) ? <EyeOutlined/> : <EyeInvisibleOutlined/>
                return (
                    <Space size={sizeXXS}>
                        <span>{unref(visible) ? text : '＊＊＊＊＊'}</span>
                        <a onClick={onVisibleClick}>{eyeIcon}</a>
                    </Space>
                )
            }
            const needFieldProps: PasswordProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const dom = <Input.Password {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
