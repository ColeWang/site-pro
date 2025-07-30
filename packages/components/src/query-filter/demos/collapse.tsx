import { defineComponent, Fragment } from 'vue'
import { QueryFilter, Text } from '@site-pro/components'
import { Divider } from 'ant-design-vue'

export default defineComponent(() => {
    function onFinish (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Fragment>
                <QueryFilter collapse={true} defaultCollapsed={false} onFinish={onFinish}>
                    <Text label={'Text1'} name={'text1'}/>
                    <Text label={'Text2'} name={'text2'}/>
                    <Text label={'Text3'} name={'text3'}/>
                    <Text label={'Text4'} name={'text4'}/>
                </QueryFilter>
                <Divider/>
                <QueryFilter collapse={true} defaultCollapsed={true} onFinish={onFinish}>
                    <Text label={'Text1'} name={'text1'}/>
                    <Text label={'Text2'} name={'text2'}/>
                    <Text label={'Text3'} name={'text3'}/>
                    <Text label={'Text4'} name={'text4'}/>
                </QueryFilter>
                <Divider/>
                <QueryFilter collapse={true} defaultRowsNumber={2} onFinish={onFinish}>
                    <Text label={'Text1'} name={'text1'}/>
                    <Text label={'Text2'} name={'text2'}/>
                    <Text label={'Text3'} name={'text3'}/>
                    <Text label={'Text4'} name={'text4'}/>
                </QueryFilter>
            </Fragment>
        )
    }
})
