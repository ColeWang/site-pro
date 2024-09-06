<template>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
    import { RouterView } from 'vue-router'
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
