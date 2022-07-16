<template>
  <el-menu
    active-text-color="#ffd04b"
    :background-color="variables.menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <Menus :routerList="menuRouter"></Menus>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
import variables from '@/styles/variables.scss'
import Menus from './Menus.vue'
import { menuRouter } from '@/router/menuRouter.js'

// const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
// const icon = ref('menu')

const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menusList = ref([])
const initMenusList = async () => {
  menusList.value = await menuList()
}
initMenusList()

// const savePath = (path) => {
//   sessionStorage.setItem('path', `/${path}`)
// }
</script>

<style lang="scss" scoped></style>
