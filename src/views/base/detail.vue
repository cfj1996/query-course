<script setup lang="ts">
import { useRoute } from 'vue-router'
import UserInfo from '@/components/UserInfo.vue'

const route = useRoute()
</script>

<template>
  <UserInfo :id="Number(route.params.id)" />
</template>

<style scoped></style>
