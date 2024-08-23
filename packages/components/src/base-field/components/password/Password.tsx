import { defineComponent, ref, unref } from 'vue'
import { Input, Space, theme } from 'ant-design-vue'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { getSlotVNode, isEmpty, preventDefault } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import { fieldPasswordProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldPassword',
    props: fieldPasswordProps(),
    setup (props, { slots }) {
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['global'])

        const visible = ref(props.fieldProps.visible || false)

        function onVisibleClick (evt: Event) {
            preventDefault(evt)
            visible.value = !unref(visible)
        }

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { sizeXXS } = unref(token)
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                if (isEmpty(text)) return emptyText
                // --
                const eyeIcon = unref(visible) ? <EyeOutlined/> : <EyeInvisibleOutlined/>
                return (
                    <Space size={sizeXXS}>
                        <span>{unref(visible) ? text : '＊＊＊＊＊'}</span>
                        <a onClick={onVisibleClick}>{eyeIcon}</a>
                    </Space>
                )
            }
            const needFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom = <Input.Password {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
