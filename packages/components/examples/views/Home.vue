<template>
  <LocaleProvider :locale="enUS">
    <ProBaseForm :model="{}" @finish="onFinish">
      <ProText :field-props="{ addonAfter: '123' }"></ProText>
    </ProBaseForm>
  </LocaleProvider>
</template>

<script setup lang="ts">
  import { BaseForm as ProBaseForm, LocaleProvider, Text as ProText } from '@site-pro/components'
  import enUS from '@site-pro/locale/en-US'
  
  function onFinish (value: string) {
    return value
  }
</script>

<style scoped>

</style>
