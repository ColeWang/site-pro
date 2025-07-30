import { defineComponent, Fragment } from 'vue'
import { QueryFilter, Text } from '@site-pro/components'

export default defineComponent(() => {
    function onFinish (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Fragment>
                <QueryFilter onFinish={onFinish}>
                    <Text label={'Text1'} name={'text1'} initialValue={'123'} required={true}/>
                    <Text label={'Text2'} name={'text2'}/>
                    <Text label={'Text3'} name={'text3'}/>
                    <Text label={'Text4'} name={'text4'}/>
                </QueryFilter>
            </Fragment>
        )
    }
})
