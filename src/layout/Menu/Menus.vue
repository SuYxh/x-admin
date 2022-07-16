<template>
  <div>
    <template v-for="item in routerList">
      <el-sub-menu
        v-if="item.hasOwnProperty('children') && item.children.length > 0"
        :key="item.path"
        :index="item.path"
      >
        <template #title style="padding-left: 10px">
          <i class="el-icon-menu"></i>
          <span>{{ item.name }}</span>
        </template>
        <!--  如果有子级数据使用递归组件 -->
        <Menus :routerList="item.children"></Menus>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path" :key="item.path">
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  props: {
    routerList: {
      type: Array
    }
  },
  setup() {
    const state = reactive({
      count: 0
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped></style>
