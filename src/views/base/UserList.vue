<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMutation, useQuery, useQueryClient } from 'zan-mixin-query'
import dataSource from '@/service/dataSource'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'UserList',
})
const page = ref(1)
const pageSize = ref(10)
const formData = reactive({ username: '' })
const username = ref('')
const {
  data,
  isFetching: isLoading,
  error,
  refetch,
} = useQuery({
  queryKey: ['user', formData, page, pageSize],
  queryFn({ queryKey }) {
    const data = queryKey[1] as { username: string }
    return dataSource.finPagedList({
      username: data.username,
      page: page.value,
      pageSize: pageSize.value,
    })
  },
  placeholderData: (previousData) => previousData,
})
const queryClient = useQueryClient()
const { mutate, variables, isPending } = useMutation({
  mutationFn: dataSource.del,
  async onSuccess(_, id) {
    // 需要删除这个查询的缓存数据
    queryClient.removeQueries({ queryKey: ['user', id] })
    // 刷新列表
    return refetch()
  },
  onError(error: Error) {
    ElMessage.error(error.message)
  },
})
const handleReset = () => {
  username.value = ''
  page.value = 1
  formData.username = ''
  refetch()
}
const handleSubmit = () => {
  page.value = 1
  formData.username = username.value
  refetch()
}
const paginationPageChange = (val: number) => {
  page.value = val
  console.log('currentPage', val)
}
const paginationPageSizeChange = (val: number) => {
  pageSize.value = val
  console.log('pageSize', val)
}
const router = useRouter()
</script>
<template>
  <div>
    <el-card class="mt-4">
      <template #header>
        <el-text>用户列表增删改查</el-text>
        <el-button
          class="float-end"
          type="primary"
          link
          @click="router.push({ name: 'baseCreate' })"
          >新增
        </el-button>
      </template>
      <el-form inline class="flex justify-between">
        <el-form-item class="mb-0" label="用户名">
          <el-input v-model="username" clearable placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item class="mb-0">
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" :loading="isLoading" @click="handleSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt-4">
      <el-table
        border
        :data="data?.items"
        v-loading="isLoading"
        :empty-text="error?.message || '暂无数据'"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column label="年龄" prop="age" />
        <el-table-column
          label="性别"
          prop="sex"
          :formatter="(row: any) => (row.sex ? '男' : '女')"
        />
        <el-table-column label="描述" prop="desc" show-overflow-tooltip />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              @click="router.push({ name: 'baseUserDetail', params: { id: row.id } })"
              >详情
            </el-button>
            <el-button
              type="primary"
              link
              @click="router.push({ name: 'baseUpdate', params: { id: row.id } })"
              >编辑
            </el-button>
            <el-button
              type="danger"
              :loading="variables === row.id && isPending"
              link
              @click="() => mutate(row.id)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="mt-4 flex justify-end">
      <el-pagination
        :current-page="page"
        :page-size="pageSize"
        :total="data?.count"
        @size-change="paginationPageSizeChange"
        @current-change="paginationPageChange"
      />
    </el-card>
  </div>
</template>

<style scoped></style>
