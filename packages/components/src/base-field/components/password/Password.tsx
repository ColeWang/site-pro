import type { Ref, SlotsType, VNodeChild } from 'vue'
import { defineComponent, ref, unref } from 'vue'
import { Input, Space, theme } from 'ant-design-vue'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode, preventDefault } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale'
import type { FieldPasswordFieldProps, FieldPasswordSlots } from './typings'
import { fieldPasswordProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldPassword',
    props: fieldPasswordProps(),
    slots: Object as SlotsType<FieldPasswordSlots>,
    setup (props, { slots }) {
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['global'])

        const visible: Ref<boolean> = ref(props.fieldProps.visible || false)

        function onVisibleClick (evt: Event): void {
            preventDefault(evt)
            visible.value = !unref(visible)
        }

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { sizeXXS } = unref(token)
            const placeholder: string | number = fieldProps.placeholder || t('inputPlaceholder')!

            if (mode === 'read') {
                const eyeIcon: VNodeChild = unref(visible) ? <EyeOutlined/> : <EyeInvisibleOutlined/>

                const readDom: VNodeChild = (
                    <Space size={sizeXXS}>
                        <span>{unref(visible) ? text ?? emptyText : '＊＊＊＊＊'}</span>
                        <a onClick={onVisibleClick}>{eyeIcon}</a>
                    </Space>
                )
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldPasswordFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <Input.Password {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
