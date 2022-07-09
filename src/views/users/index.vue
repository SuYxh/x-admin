<template>
  <!-- <div>users233</div> -->
  <el-card>
    <!-- 搜索 -->
    <el-row class="header" :gutter="20">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUserList">{{
        $t('table.search')
      }}</el-button>
      <el-button type="primary" @click="handleDialogValue">{{
        $t('table.adduser')
      }}</el-button>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in options"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" @change="changeState(row)" />
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          {{ $filters.filterTimes(row.create_time) }}
        </template>
        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="handleDialogValue(row)"
          ></el-button>
          <el-button type="success" size="small" :icon="Setting"></el-button>
          <el-button
            type="info"
            size="small"
            :icon="Delete"
            @click="deleteUserFn(row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  -->
    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
      :page-sizes="[2, 5, 10, 15]"
      layout="total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <Dialog ref="dialogRef" :title="title" @closeDialog="closeDialog" />
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUser, changeUserState, deleteUser } from '@/api/users.js'
import { options } from './options'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Dialog from './components/Dialog.vue'

const i18n = useI18n()
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 15
})

const dialogRef = ref(null)
const title = ref('')

const total = ref(0)

const tableData = ref([])

const initGetUserList = async () => {
  const res = await getUser(queryForm.value)
  console.log(res)
  tableData.value = res.users
  total.value = res.total
}

initGetUserList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUserList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUserList()
}

const changeState = async (row) => {
  await changeUserState(row.id, row.mg_state)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success'
  })
}

const handleDialogValue = (row) => {
  console.log('handleDialogValue', row)
  title.value = row ? '编辑用户' : '新增用户'
  dialogRef.value.openDialog()
}

const closeDialog = () => {
  console.log('closeDialog')
  initGetUserList()
}

const deleteUserFn = async (id) => {
  console.log(id)
  await deleteUser(id)
  initGetUserList()
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-input__suffix {
  align-items: center;
}

::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
