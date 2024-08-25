<template>
  <LocaleProvider :locale="enUS">
    <Text></Text>
  </LocaleProvider>
</template>

<script setup lang="ts">
  import { LocaleProvider, Text } from '@site-pro/components'
  import { enUS } from '@site-pro/locale'
</script>

<style scoped>

</style>
