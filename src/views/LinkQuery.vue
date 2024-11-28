<script setup lang="ts">
import { useQuery } from 'zan-mixin-query'
import dataSource from '@/service/dataSource'
import UserInfo from '@/components/UserInfo.vue'
import { ref, watch } from 'vue'

const activeName = ref()

const { data, isLoading } = useQuery({
  queryKey: ['user'],
  queryFn() {
    return dataSource.finPagedList({
      username: '',
      page: 1,
      pageSize: 5,
    })
  },
})
watch(
  data,
  (value) => {
    if (value?.items[0]?.id) {
      activeName.value = value?.items[0]?.id
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <el-card v-loading="isLoading">
    <template v-if="data">
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="item in data?.items"
          :label="item.username"
          :name="item.id"
          :key="item.id"
        />
      </el-tabs>
      <UserInfo :id="activeName" />
    </template>
  </el-card>
</template>

<style scoped></style>
