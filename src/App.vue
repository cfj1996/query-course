<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <el-container class="common-layout h-full">
    <el-aside width="200px">
      <el-scrollbar>
        <ul>
          <li class="text-center py-5">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li class="text-center py-5">
            <RouterLink to="/base">基础的增删改查</RouterLink>
          </li>
          <li class="text-center py-5">
            <RouterLink to="/linkQuery">联动查询</RouterLink>
          </li>
        </ul>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <RouterView v-slot="{ Component }">
        <keep-alive include="UserList">
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
