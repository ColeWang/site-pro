<template>
  <LocaleProvider :locale="enUS">
    <ProBaseForm :model="{}" @finish="onFinish">
    
    </ProBaseForm>
    <ProText>
      <template #prefix>111</template>
    </ProText>
  </LocaleProvider>
</template>

<script setup lang="ts">
  import { BaseForm as ProBaseForm, LocaleProvider, Text as ProText } from '../../src'
  import enUS from '@site-pro/locale/en-US'
  
  function onFinish (value: string) {
    return value
  }
</script>

<style scoped>

</style>
