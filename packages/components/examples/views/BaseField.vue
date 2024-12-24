<template>
    <BaseFieldProvider :valueTypeMap="valueTypeMap">
        <QueryFilter>
            <UserField label="UserField" valueType="test" :fieldProps="{ onInput }"/>
        </QueryFilter>
    </BaseFieldProvider>
</template>

<script setup lang="ts">
    import { ref, h } from 'vue'
    import { BaseFieldProvider, UserField, QueryFilter } from '@site-pro/components'
    
    const valueTypeMap = ref({
        test: ({ props, slots }: any) => {
            console.log(props, slots)
            return h('input', { onInput: props.fieldProps.onInput })
        }
    })
    
    function onInput (evt: InputEvent) {
        console.log(evt)
    }
</script>

<style scoped>

</style>
