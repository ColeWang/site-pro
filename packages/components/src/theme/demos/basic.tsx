import type { Ref } from 'vue'
import { defineComponent, Fragment, ref } from 'vue'
import { Button, theme } from 'ant-design-vue'
import { ThemeProvider } from '@site-pro/components'

export default defineComponent(() => {
    const { token } = theme.useToken()

    const tokenConfig: Ref<Record<string, any>> = ref({})

    function onClick (value: any) {
        return () => {
            tokenConfig.value = value
        }
    }

    return () => {
        return (
            <Fragment>
                <ThemeProvider token={tokenConfig.value}>
                    <Button.Group>
                        <Button onClick={onClick({ colorPrimary: token.value.blue })}>蓝色</Button>
                        <Button onClick={onClick({ colorPrimary: token.value.purple })}>紫色</Button>
                    </Button.Group>
                </ThemeProvider>
            </Fragment>
        )
    }
})
