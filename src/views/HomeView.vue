<script setup lang="ts">
import { getUsers, setUsers } from '@/service/dataSource'

defineOptions({
  name: 'HomeView',
})
const initData = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    sex: true,
    age: 25,
    desc: '喜欢编程，热爱挑战',
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    sex: false,
    age: 30,
    desc: '喜欢旅行，探索世界',
  },
  {
    id: 3,
    username: 'user3',
    email: 'user3@example.com',
    sex: true,
    age: 22,
    desc: '喜欢运动，尤其是篮球',
  },
  {
    id: 4,
    username: 'user4',
    email: 'user4@example.com',
    sex: false,
    age: 27,
    desc: '热爱美食，爱做菜',
  },
  {
    id: 5,
    username: 'user5',
    email: 'user5@example.com',
    sex: true,
    age: 35,
    desc: '注重健康，喜欢跑步',
  },
  {
    id: 6,
    username: 'user6',
    email: 'user6@example.com',
    sex: false,
    age: 40,
    desc: '书虫，喜欢阅读历史书籍',
  },
  {
    id: 7,
    username: 'user7',
    email: 'user7@example.com',
    sex: true,
    age: 28,
    desc: '科技迷，关注人工智能发展',
  },
  {
    id: 8,
    username: 'user8',
    email: 'user8@example.com',
    sex: false,
    age: 24,
    desc: '艺术爱好者，喜欢绘画',
  },
  {
    id: 9,
    username: 'user9',
    email: 'user9@example.com',
    sex: true,
    age: 26,
    desc: '极限运动爱好者',
  },
  {
    id: 10,
    username: 'user10',
    email: 'user10@example.com',
    sex: false,
    age: 33,
    desc: '社交达人，擅长组织活动',
  },
  {
    id: 11,
    username: 'user11',
    email: 'user11@example.com',
    sex: true,
    age: 21,
    desc: '摄影爱好者，喜欢户外',
  },
  {
    id: 12,
    username: 'user12',
    email: 'user12@example.com',
    sex: false,
    age: 32,
    desc: '爱好科技，关注创新产品',
  },
  {
    id: 13,
    username: 'user13',
    email: 'user13@example.com',
    sex: true,
    age: 29,
    desc: '喜欢收集古董',
  },
  {
    id: 14,
    username: 'user14',
    email: 'user14@example.com',
    sex: false,
    age: 26,
    desc: '旅行狂人，走遍世界',
  },
  {
    id: 15,
    username: 'user15',
    email: 'user15@example.com',
    sex: true,
    age: 31,
    desc: '电影爱好者，喜欢科幻片',
  },
  {
    id: 16,
    username: 'user16',
    email: 'user16@example.com',
    sex: false,
    age: 23,
    desc: '喜爱摄影与编辑',
  },
  {
    id: 17,
    username: 'user17',
    email: 'user17@example.com',
    sex: true,
    age: 27,
    desc: '程序员，喜爱技术分享',
  },
  {
    id: 18,
    username: 'user18',
    email: 'user18@example.com',
    sex: false,
    age: 34,
    desc: '喜欢瑜伽与冥想',
  },
  {
    id: 19,
    username: 'user19',
    email: 'user19@example.com',
    sex: true,
    age: 23,
    desc: '健身爱好者，追求力量',
  },
  {
    id: 20,
    username: 'user20',
    email: 'user20@example.com',
    sex: false,
    age: 30,
    desc: '热衷环保与可持续发展',
  },
]
if (getUsers().length === 0) {
  setUsers(initData)
}
</script>

<template>
  <el-card>
    <el-alert>vue query 使用例子展示</el-alert>
  </el-card>
</template>
