<script lang="ts">
import dataSource from '@/service/dataSource'

export default {
  data() {
    return {
      data: undefined,
      isLoading: false,
      error: null,
    }
  },
  props: {
    id: Number,
  },
  methods: {
    queryUser() {
      this.isLoading = true
      dataSource
        .findOneId(this.id!)
        .then((res) => {
          this.data = res
          this.isLoading = false
          this.error = null
        })
        .catch((err) => {
          this.data = undefined
          this.isLoading = false
          this.error = err
        })
    },
  },
  watch: {
    id: {
      handler() {
        // 这样写会产生数据竞争问题
        this.queryUser()
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <el-card class="min-h-20" v-loading="isLoading">
    <el-descriptions v-if="data">
      <el-descriptions-item label="用户名">{{ data.username }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ data.email }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ data.sex ? '男' : '女' }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ data.age }}</el-descriptions-item>
      <el-descriptions-item label="描述">{{ data.desc }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
