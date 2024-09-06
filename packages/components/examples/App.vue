<template>
    <ConfigProvider :theme="providerTheme">
        <RouterView></RouterView>
    </ConfigProvider>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { RouterView } from 'vue-router'
    import { ConfigProvider, theme } from 'ant-design-vue'
    
    const providerTheme = computed(() => {
        return {
            algorithm: [theme.compactAlgorithm],
        }
    })
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    html, body, #app {
        width: 100%;
        height: 100%;
    }
    
    #app {
        overflow-y: auto;
    }
</style>
