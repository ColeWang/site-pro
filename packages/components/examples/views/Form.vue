<template>
    <Card>
        <Form layout="horizontal">
            <Text
                label="Text"
                name="text"
                :label-width="100"
            >
            </Text>
            <Number
                label="Number"
                name="number"
                :label-width="100"
            >
            </Number>
        </Form>
    </Card>
    <Card>
        <Form layout="vertical">
            <Text
                label="Text"
                name="text"
            >
            </Text>
            <Number
                label="Number"
                name="number"
            >
            </Number>
        </Form>
    </Card>
    <Card>
        <Form layout="inline">
            <Text
                label="Text"
                name="text"
                :width="300"
            >
            </Text>
            <Number
                label="Number"
                name="number"
            >
            </Number>
        </Form>
    </Card>
</template>

<script setup lang="ts">
    import { Card } from 'ant-design-vue'
    import { Form, Text, Number } from '../../src'
</script>

<style scoped>

</style>
