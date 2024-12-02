<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <el-container class="common-layout h-full">
    <el-aside width="200px">
      <el-scrollbar>
        <ul>
          <li class="text-center py-5">
            <RouterLink to="/">
              <template #default="{ isActive }">
                <el-text :type="isActive ? 'primary' : ''">Home</el-text>
              </template>
            </RouterLink>
          </li>
          <li class="text-center py-5">
            <RouterLink to="/base">
              <template #default="{ isActive }">
                <el-text :type="isActive ? 'primary' : ''">基础的增删改查</el-text>
              </template>
            </RouterLink>
          </li>
          <li class="text-center py-5">
            <RouterLink to="/infiniteQuery">
              <template #default="{ isActive }">
                <el-text :type="isActive ? 'primary' : ''">无限加载</el-text>
              </template>
            </RouterLink>
          </li>
          <li class="text-center py-5">
            <RouterLink to="/linkQuery">
              <template #default="{ isActive }">
                <el-text :type="isActive ? 'primary' : ''">联动查询</el-text>
              </template>
            </RouterLink>
          </li>
          <li class="text-center py-5">
            <RouterLink to="/suspense">
              <template #default="{ isActive }">
                <el-text :type="isActive ? 'primary' : ''">suspense模式</el-text>
              </template>
            </RouterLink>
          </li>
        </ul>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <RouterView v-slot="{ Component }">
        <keep-alive :include="['UserList', 'SuspenseQuery']">
          <component :is="Component" />
        </keep-alive>
      </RouterView>
    </el-main>
  </el-container>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.common-layout {
  height: 100vh;
}
</style>
