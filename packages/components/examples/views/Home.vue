<template>
  <ConfigProvider>
    <LocaleProvider :locale="enUS">
      <ProQueryFilter :loading="true" :show-collapse="true" :label-width="90" :on-values-change="onValuesChange" :on-finish="onFinish">
        <ProText name="aaa" label="ProText" :label-width="150"></ProText>
        <ProText name="bbb" label="ProText" :label-width="100"></ProText>
        <ProText :name="['ccc', 'ddd']" label="ProText">
          <template v-slot:prefix>$</template>
        </ProText>
      </ProQueryFilter>
    </LocaleProvider>
  </ConfigProvider>
</template>

<script setup lang="ts">
  import { ConfigProvider } from 'ant-design-vue'
  import enUS from '@site-pro/locale/en-US'
  import { QueryFilter as ProQueryFilter, Text as ProText, LocaleProvider } from '../../src'
  
  function onValuesChange (values: any) {
    console.log(values)
  }
  
  function onFinish (values: any) {
    console.log(values)
  }
</script>

<style scoped>

</style>
