import type { Ref } from 'vue'
import { defineComponent, Fragment, ref } from 'vue'
import { Button } from 'ant-design-vue'
import { LocaleProvider, Text } from '@site-pro/components'
import { enUS, zhCN } from '@site-pro/locale'

export default defineComponent(() => {
    const locale: Ref<Record<string, any>> = ref(zhCN)

    function onClick (value: any) {
        return () => {
            locale.value = value
        }
    }

    return () => {
        return (
            <Fragment>
                <LocaleProvider locale={locale.value}>
                    <Button.Group>
                        <Button onClick={onClick(zhCN)}>中文</Button>
                        <Button onClick={onClick(enUS)}>英文</Button>
                    </Button.Group>
                    <Text label={'Text'} name={'text'} width={180}/>
                </LocaleProvider>
            </Fragment>
        )
    }
})
