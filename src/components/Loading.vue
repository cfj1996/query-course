<script setup lang="ts">
defineOptions({
  name: 'SuspenseLoading',
})
</script>

<template>
  <div class="w-100px h-100px mx-auto py-10" v-loading="true" />
</template>

<style scoped></style>
