<template>
  <div>
    <template v-for="item in routerList">
      <el-sub-menu
        v-if="item.hasOwnProperty('children') && item.children.length > 0"
        :key="item.path"
        :index="item.path"
      >
        <template #title style="padding-left: 10px">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <!--  如果有子级数据使用递归组件 -->
        <Menus :routerList="item.children"></Menus>
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="item.path"
        :key="item.title"
        @click="savePath(item.path)"
      >
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  props: {
    routerList: {
      type: Array
    }
  },
  setup() {
    const route = useRoute()

    const state = reactive({
      count: 0
    })

    const savePath = (path) => {
      sessionStorage.setItem('path', `/${path}`)
    }

    return {
      savePath,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped></style>
