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
    <Menus :routerList="routerList"></Menus>
  </el-menu>
</template>

<script setup>
import { computed, ref } from 'vue'
import variables from '@/styles/variables.scss'
import Menus from './Menus.vue'
import { menuRouter } from '@/router/menuRouter.js'
import parseMenu from '@/utils/parseMenu.js'

// const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
// const icon = ref('menu')

const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const routerList = computed(() => parseMenu(menuRouter))
</script>

<style lang="scss" scoped></style>
