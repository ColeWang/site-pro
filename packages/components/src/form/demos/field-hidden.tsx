import { defineComponent, Fragment, ref, unref } from 'vue'
import { Form, Number, Text } from '@site-pro/components'
import { Button, Col, Divider, Space } from 'ant-design-vue'

export default defineComponent(() => {
    const hidden = ref(false)

    function onHidden () {
        hidden.value = !hidden.value
    }

    function onFinish (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Fragment>
                <Form onFinish={onFinish}>
                    <Text
                        label={'Text'}
                        name={'text'}
                        width={180}
                        hidden={unref(hidden)}
                    />
                    <Number
                        label={'Number'}
                        name={'number'}
                        width={180}
                    />
                    <Space>
                        <Button onClick={onHidden}>Show/Hide</Button>
                        <Button type={'primary'} html-type={'submit'}>提交</Button>
                    </Space>
                </Form>
                <Divider/>
                <Form grid={true} onFinish={onFinish}>
                    <Text
                        label={'Text'}
                        name={'text'}
                        colProps={{ span: 12 }}
                        hidden={unref(hidden)}
                    />
                    <Number
                        label={'Number'}
                        name={'number'}
                        colProps={{ span: 12 }}
                    />
                    <Number
                        label={'Number2'}
                        name={'number2'}
                        colProps={{ span: 12 }}
                    />
                    <Col span={24}>
                        <Space>
                            <Button onClick={onHidden}>Show/Hide</Button>
                            <Button type={'primary'} html-type={'submit'}>提交</Button>
                        </Space>
                    </Col>
                </Form>
            </Fragment>
        )
    }
})
