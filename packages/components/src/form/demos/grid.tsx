import { defineComponent, Fragment } from 'vue'
import { Form, Number, Text } from '@site-pro/components'
import { Button, Col, Divider } from 'ant-design-vue'

export default defineComponent(() => {
    function onFinish (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Fragment>
                <Form layout={'vertical'} grid={true} onFinish={onFinish}>
                    <Text
                        label={'Text'}
                        name={'text'}
                        colProps={{ span: 12 }}
                    />
                    <Number
                        label={'Number'}
                        name={'number'}
                        colProps={{ span: 12 }}
                    />
                    <Col span={24}>
                        <Button type={'primary'} html-type={'submit'}>提交</Button>
                    </Col>
                </Form>
                <Divider/>
                <Form layout={'horizontal'} grid={true} onFinish={onFinish}>
                    <Text
                        label={'Text'}
                        name={'text'}
                        colProps={{ span: 12 }}
                    />
                    <Number
                        label={'Number'}
                        name={'number'}
                        colProps={{ span: 12 }}
                    />
                    <Col span={24}>
                        <Button type={'primary'} html-type={'submit'}>提交</Button>
                    </Col>
                </Form>
            </Fragment>
        )
    }
})
