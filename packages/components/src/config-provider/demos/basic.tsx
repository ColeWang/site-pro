import { defineComponent, ref, unref } from 'vue'
import { ConfigProvider } from '@site-pro/components'
import { Button, Space } from 'ant-design-vue'

export default defineComponent(() => {
    const dark = ref(false)
    const compact = ref(false)

    function onClickDark () {
        dark.value = !dark.value
    }

    function onClickCompact () {
        compact.value = !compact.value
    }

    return () => {
        return (
            <ConfigProvider dark={unref(dark)} compact={unref(compact)}>
                <Space>
                    <Button onClick={onClickDark}>Change Dark</Button>
                    <Button onClick={onClickCompact}>Change Compact</Button>
                </Space>
            </ConfigProvider>
        )
    }
})
