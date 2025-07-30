import { defineComponent, Fragment } from 'vue'
import { Form, Number, Text } from '@site-pro/components'
import { Button, Divider } from 'ant-design-vue'

export default defineComponent(() => {
    function onFinish (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Fragment>
                <Form layout={'vertical'} onFinish={onFinish}>
                    <Text
                        label={'Text'}
                        name={'text'}
                    />
                    <Number
                        label={'Number'}
                        name={'number'}
                        width={'100%'}
                    />
                    <Button type={'primary'} html-type={'submit'}>提交</Button>
                </Form>
                <Divider/>
                <Form layout={'horizontal'} onFinish={onFinish}>
                    <Text
                        label={'Text'}
                        name={'text'}
                    />
                    <Number
                        label={'Number'}
                        name={'number'}
                        width={'100%'}
                    />
                    <Button type={'primary'} html-type={'submit'}>提交</Button>
                </Form>
                <Divider/>
                <Form layout={'inline'} onFinish={onFinish}>
                    <Text
                        label={'Text'}
                        name={'text'}
                        width={180}
                    />
                    <Number
                        label={'Number'}
                        name={'number'}
                        width={180}
                    />
                    <Button type={'primary'} html-type={'submit'}>提交</Button>
                </Form>
            </Fragment>
        )
    }
})
