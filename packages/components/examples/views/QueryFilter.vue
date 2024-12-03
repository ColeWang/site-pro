<template>
    <Card>
        <QueryFilter layout="horizontal" :label-width="80">
            <Text
                label="Text"
                name="text"
                :required="true"
            >
            </Text>
            <Number
                label="Number"
                name="number"
                :width="100"
                :label-width="60"
            >
            </Number>
            <Text
                label="Text"
                name="text"
            >
            </Text>
            <Number
                label="Number"
                name="number"
                :required="true"
            >
            </Number>
        </QueryFilter>
    </Card>
    <Card>
        <QueryFilter layout="vertical">
            <Text
                label="Text"
                name="text"
                :required="true"
            >
            </Text>
            <Number
                label="Number"
                name="number"
            >
            </Number>
            <Text
                label="Text"
                name="text"
            >
            </Text>
            <Number
                label="Number"
                name="number"
                :required="true"
            >
            </Number>
        </QueryFilter>
    </Card>
</template>

<script setup lang="ts">
    import { Card } from 'ant-design-vue'
    import { Number, QueryFilter, Text } from '../../src'
</script>

<style scoped>

</style>
