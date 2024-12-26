<template>
    <Layout class="base-layout">
        <Layout.Sider>
            <Menu mode="inline" theme="dark" :selected-keys="selectedKeys" @select="onSelect">
                <Menu.SubMenu v-for="parent in routes">
                    <template v-slot:title>
                        {{ parent.meta!.title }}
                    </template>
                    <Menu.Item v-for="item in parent.children" :key="item.name">
                        {{ item.meta!.title }}
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Layout.Sider>
        <Layout>
            <Layout.Content>
                <div class="layout-container">
                    <div class="content-space">
                        <div class="content-fill"></div>
                        <div class="content">
                            <RouterView/>
                        </div>
                        <div class="content-fill"></div>
                    </div>
                </div>
            </Layout.Content>
        </Layout>
    </Layout>
</template>

<script setup lang="ts">
    import type { Ref } from 'vue'
    import { ref, watch } from 'vue'
    import { RouterView, useRoute, useRouter } from 'vue-router'
    import { Layout, Menu } from 'ant-design-vue'
    import { routes } from './router'
    
    const route = useRoute()
    const router = useRouter()
    
    const selectedKeys: Ref<string[]> = ref([])
    
    watch(route, (currentRoute) => {
        selectedKeys.value = [currentRoute.name! as string]
    }, { deep: true, immediate: true })
    
    function onSelect (params: any) {
        if (route.name !== params.key) {
            router.push({ name: params.key })
        }
    }
</script>

<style scoped>
    .base-layout {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .layout-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    .content-space {
        width: 100%;
        height: 100%;
        padding-inline: 16px;
        overflow-y: auto;
    }
    
    .content-fill {
        height: 16px;
    }
    
    .content {
        position: relative;
    }
</style>
