<script setup lang="ts">
defineOptions({
  name: 'ErrorBoundary',
})
const props = defineProps<{ error: Error }>()
const emits = defineEmits(['success'])
console.log('props.error', props.error._refetch)
const handleClick = () => {
  emits('success')
}
</script>

<template>
  <el-result icon="error" :title="props.error.name" :sub-title="error.message">
    <template #extra>
      <el-button v-if="error._refetch" type="primary" @click="handleClick">刷新</el-button>
    </template>
  </el-result>
</template>

<style scoped></style>
