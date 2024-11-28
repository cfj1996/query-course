<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from 'zan-mixin-query'
import dataSource, { type User } from '@/service/dataSource'
import { ElMessage } from 'element-plus'

const formRef = ref()
const formData = reactive({
  username: '',
  email: '',
  sex: true,
  age: 1,
  desc: '',
})
const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()
const { data, isSuccess, isLoading, isStale, isError, error, refetch } = useQuery({
  staleTime: 5 * 1000,
  queryKey: ['user', Number(route.params.id)],
  queryFn() {
    return dataSource.findOneId(Number(route.params.id))
  },
  refetchOnWindowFocus: false,
  enabled: Boolean(route.params.id),
})
const { mutate, isPending } = useMutation({
  mutationFn(values: Omit<User, 'id'>) {
    if (route.params.id) {
      return dataSource.update(Number(route.params.id), values)
    }
    return dataSource.add(values)
  },
  async onSuccess() {
    if (route.params.id) {
      refetch()
    }
    await queryClient.invalidateQueries({ queryKey: ['user'] })
    window.history.go(-1)
  },
  onError(error: Error) {
    ElMessage.error(error.message)
  },
})
const handleReset = () => {
  router.back()
}
const handleSubmit = async () => {
  await formRef.value.validate()
  mutate(formData)
}
watch(
  data,
  (value) => {
    if (value) {
      Object.assign(formData, value)
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <el-form
    v-if="!isError"
    v-loading="isLoading"
    ref="formRef"
    :model="formData"
    label-position="top"
  >
    <el-form-item label="用户名" required prop="username">
      <el-input v-model="formData.username" />
    </el-form-item>
    <el-form-item label="邮箱" required prop="email">
      <el-input v-model="formData.email" />
    </el-form-item>
    <el-form-item label="年龄" required prop="age">
      <el-input-number v-model="formData.age" :min="1" :max="100" :step="1" />
    </el-form-item>
    <el-form-item label="性别" required prop="sex">
      <el-radio-group v-model="formData.sex">
        <el-radio :value="true">男</el-radio>
        <el-radio :value="false">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="formData.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button @click="refetch">刷新</el-button>
      <el-button @click="handleReset">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="isPending">保存</el-button>
    </el-form-item>
  </el-form>
  <el-result v-if="isError" icon="error" title="网络错误" :sub-title="error!.message" />
</template>
