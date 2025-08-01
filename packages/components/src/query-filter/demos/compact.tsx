import { defineComponent, ref, unref } from 'vue'
import { QueryFilter, Text, ConfigProvider } from '@site-pro/components'
import { Button } from 'ant-design-vue'

export default defineComponent(() => {
    const compact = ref(false)

    function onClick () {
        compact.value = !compact.value
    }

    function onFinish (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <ConfigProvider compact={unref(compact)}>
                <QueryFilter onFinish={onFinish}>
                    <Text label={'Text1'} name={'text1'} initialValue={'123'} required={true}/>
                    <Text label={'Text2'} name={'text2'}/>
                    <Text label={'Text3'} name={'text3'}/>
                    <Text label={'Text4'} name={'text4'}/>
                </QueryFilter>
                <Button onClick={onClick}>Change Compact</Button>
            </ConfigProvider>
        )
    }
})
